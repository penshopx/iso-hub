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
  return "deepseek";
}

export function isAIConfigured(_provider?: AIProvider): boolean {
  return false;
}

export function getAIConfig(_provider?: AIProvider) {
  return { apiKey: "", model: "deepseek-chat", baseUrl: "https://api.deepseek.com/v1" };
}
