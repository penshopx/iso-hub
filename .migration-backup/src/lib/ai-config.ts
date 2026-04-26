export const AI_CONFIG = {
  google: {
    apiKey: process.env.GOOGLE_API_KEY || "",
    model: process.env.GOOGLE_MODEL || "gemini-2.0-flash",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta"
  },
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY || "",
    model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
    baseUrl: "https://api.deepseek.com/v1"
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    baseUrl: "https://api.openai.com/v1"
  },
  defaultProvider: process.env.DEFAULT_AI_PROVIDER || "deepseek"
} as const;

export type AIProvider = "google" | "deepseek" | "openai";

export interface AIRequest {
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  provider?: AIProvider;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  content: string;
  provider: AIProvider;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export function getAIProvider(): AIProvider {
  const provider = AI_CONFIG.defaultProvider;
  if (provider === "google" || provider === "deepseek" || provider === "openai") {
    return provider;
  }
  return "deepseek";
}

export function isAIConfigured(provider?: AIProvider): boolean {
  const p = provider || getAIProvider();
  switch (p) {
    case "google":
      return !!AI_CONFIG.google.apiKey && AI_CONFIG.google.apiKey !== "your_google_api_key_here";
    case "deepseek":
      return !!AI_CONFIG.deepseek.apiKey && AI_CONFIG.deepseek.apiKey !== "your_deepseek_api_key_here";
    case "openai":
      return !!AI_CONFIG.openai.apiKey && AI_CONFIG.openai.apiKey !== "your_openai_api_key_here";
    default:
      return false;
  }
}

export function getAIConfig(provider?: AIProvider) {
  const p = provider || getAIProvider();
  switch (p) {
    case "google":
      return AI_CONFIG.google;
    case "deepseek":
      return AI_CONFIG.deepseek;
    case "openai":
      return AI_CONFIG.openai;
    default:
      return AI_CONFIG.deepseek;
  }
}
