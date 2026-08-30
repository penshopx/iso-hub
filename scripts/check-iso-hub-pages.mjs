import { access, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = path.join(workspaceRoot, "artifacts", "iso-hub");
const appFile = path.join(appRoot, "src", "App.tsx");
const port = Number(process.env.ISO_HUB_CHECK_PORT ?? 4174);
const configuredUrl = process.env.ISO_HUB_URL;

const source = await readFile(appFile, "utf8");
const imports = new Map();
const importPattern = /import\s+([A-Za-z_$][\w$]*)\s+from\s+["']@\/([^"']+)["']/g;

for (const match of source.matchAll(importPattern)) {
  imports.set(match[1], match[2]);
}

const routes = [];
const routePattern = /<Route\s+path=["']([^"']+)["']\s+component=\{([A-Za-z_$][\w$]*)\}\s*\/?>/g;

for (const match of source.matchAll(routePattern)) {
  routes.push({ path: match[1], component: match[2] });
}

if (routes.length === 0) {
  throw new Error(`No routes found in ${path.relative(workspaceRoot, appFile)}`);
}

async function resolveImportedFile(relativeImport) {
  const candidate = path.join(appRoot, "src", relativeImport);
  const candidates = [
    candidate,
    `${candidate}.ts`,
    `${candidate}.tsx`,
    `${candidate}.js`,
    `${candidate}.jsx`,
    path.join(candidate, "index.ts"),
    path.join(candidate, "index.tsx"),
  ];

  for (const file of candidates) {
    try {
      await access(file);
      return file;
    } catch {
      // Continue through the supported source extensions.
    }
  }

  return null;
}

const structuralErrors = [];
const seenPaths = new Set();

for (const route of routes) {
  if (seenPaths.has(route.path)) {
    structuralErrors.push(`Duplicate route path: ${route.path}`);
  }
  seenPaths.add(route.path);

  const relativeImport = imports.get(route.component);
  if (!relativeImport) {
    structuralErrors.push(
      `Route ${route.path} references ${route.component}, but no @/ import was found.`,
    );
    continue;
  }

  const importedFile = await resolveImportedFile(relativeImport);
  if (!importedFile) {
    structuralErrors.push(
      `Route ${route.path} references missing file: ${path.join("src", relativeImport)}`,
    );
  }
}

if (structuralErrors.length > 0) {
  console.error("ISO Hub route structure check failed:");
  for (const error of structuralErrors) console.error(`- ${error}`);
  process.exit(1);
}

let server;
let baseUrl;

function routeUrl(routePath) {
  const smokePath = routePath.replace(/:[^/]+/g, "smoke-test");
  return new URL(smokePath.replace(/^\//, ""), baseUrl).toString();
}

async function waitForServer(url) {
  let lastError = "unknown error";

  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`ISO Hub preview did not become ready at ${url}: ${lastError}`);
}

try {
  if (configuredUrl) {
    baseUrl = new URL(configuredUrl.endsWith("/") ? configuredUrl : `${configuredUrl}/`);
  } else {
    baseUrl = new URL(`http://127.0.0.1:${port}/`);
    server = spawn("pnpm", ["--filter", "@workspace/iso-hub", "run", "serve"], {
      cwd: workspaceRoot,
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
      env: {
        ...process.env,
        PORT: String(port),
        BASE_PATH: "/",
      },
    });
  }

  await waitForServer(baseUrl.toString());

  const httpErrors = [];
  for (const route of routes) {
    const url = routeUrl(route.path);
    try {
      const response = await fetch(url);
      const body = await response.text();

      if (!response.ok) {
        httpErrors.push(`${route.path} returned HTTP ${response.status}`);
      } else if (!body.includes('<div id="root">')) {
        httpErrors.push(`${route.path} did not return the ISO Hub application shell`);
      }
    } catch (error) {
      httpErrors.push(
        `${route.path} could not be requested: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  if (httpErrors.length > 0) {
    console.error("ISO Hub route smoke check failed:");
    for (const error of httpErrors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log(`ISO Hub route check passed: ${routes.length} routes validated.`);
  }
} finally {
  if (server?.pid) {
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      // The preview may already have exited after serving the routes.
    }
  }
}