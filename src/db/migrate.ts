import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const client = createClient({
  url: `file:${join(__dirname, "../../local.db")}`,
});
export const db = drizzle(client);

const migration = readFileSync(join(__dirname, "./migrations/0003_tough_daimon_hellstrom.sql"), "utf-8");
const statements = migration.split(";").filter(s => s.trim());

for (const stmt of statements) {
  if (stmt.trim()) {
    try {
      await client.execute(stmt);
    } catch (e: unknown) {
      const error = e as Error;
      if (error.message.includes("already exists")) {
        console.log("Table/index already exists, skipping...");
      } else {
        console.log("Statement error:", error.message.slice(0, 100));
      }
    }
  }
}

console.log("Database migration completed!");
