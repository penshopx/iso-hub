import { AIRequest, AIResponse, getAIConfig, getAIProvider, isAIConfigured, AIProvider } from "./ai-config";

interface ProviderConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

export async function sendAIRequest(request: AIRequest): Promise<AIResponse> {
  const provider = request.provider || getAIProvider();
  const config = getAIConfig(provider);

  const cfg: ProviderConfig = {
    apiKey: config.apiKey,
    model: config.model,
    baseUrl: config.baseUrl
  };

  if (!isAIConfigured(provider)) {
    throw new Error(`AI provider ${provider} is not configured. Please set the API key in environment variables.`);
  }

  const messages = request.messages.map(m => ({
    role: m.role,
    content: m.content
  }));

  switch (provider) {
    case "google":
      return await callGoogleAI(cfg, messages, request);
    case "deepseek":
      return await callDeepSeekAI(cfg, messages, request);
    case "openai":
      return await callOpenAI(cfg, messages, request);
    default:
      throw new Error(`Unknown AI provider: ${provider}`);
  }
}

async function callGoogleAI(
  config: ProviderConfig,
  messages: { role: string; content: string }[],
  request: AIRequest
): Promise<AIResponse> {
  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  const response = await fetch(
    `${config.baseUrl}/models/${config.model}:generateContent?key=${config.apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: request.temperature ?? 0.7,
          maxOutputTokens: request.maxTokens ?? 2048,
          topP: 0.95,
          topK: 40
        },
        systemInstruction: messages.find(m => m.role === "system")?.content
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Google AI error: ${error}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  return {
    content,
    provider: "google",
    model: config.model,
    usage: {
      promptTokens: data.usageMetadata?.promptTokenCount || 0,
      completionTokens: data.usageMetadata?.candidatesTokenCount || 0,
      totalTokens: data.usageMetadata?.totalTokenCount || 0
    }
  };
}

async function callDeepSeekAI(
  config: ProviderConfig,
  messages: { role: string; content: string }[],
  request: AIRequest
): Promise<AIResponse> {
  const systemMessage = messages.find(m => m.role === "system");
  const filteredMessages = messages.filter(m => m.role !== "system");

  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        ...(systemMessage ? [{ role: "system", content: systemMessage.content }] : []),
        ...filteredMessages
      ],
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 2048
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek AI error: ${error}`);
  }

  const data = await response.json();
  const choice = data.choices?.[0];
  const content = choice?.message?.content || "";

  return {
    content,
    provider: "deepseek",
    model: config.model,
    usage: data.usage ? {
      promptTokens: data.usage.prompt_tokens || 0,
      completionTokens: data.usage.completion_tokens || 0,
      totalTokens: data.usage.total_tokens || 0
    } : undefined
  };
}

async function callOpenAI(
  config: ProviderConfig,
  messages: { role: string; content: string }[],
  request: AIRequest
): Promise<AIResponse> {
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 2048
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI error: ${error}`);
  }

  const data = await response.json();
  const choice = data.choices?.[0];
  const content = choice?.message?.content || "";

  return {
    content,
    provider: "openai",
    model: config.model,
    usage: data.usage ? {
      promptTokens: data.usage.prompt_tokens || 0,
      completionTokens: data.usage.completion_tokens || 0,
      totalTokens: data.usage.total_tokens || 0
    } : undefined
  };
}

export async function generateAIResponse(
  prompt: string,
  systemPrompt?: string,
  provider?: AIProvider
): Promise<string> {
  const messages = [
    ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
    { role: "user" as const, content: prompt }
  ];

  const response = await sendAIRequest({ messages, provider });
  return response.content;
}
