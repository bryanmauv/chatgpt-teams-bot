import { AIProviderConfig } from './providers/index.js';

const config = {
  botId: process.env.BOT_ID,
  botPassword: process.env.BOT_PASSWORD,

  // Configuration du provider IA
  ai: {
    // Type de provider: 'openai', 'anthropic', 'google', 'ollama'
    type: (process.env.AI_PROVIDER || 'openai') as 'openai' | 'anthropic' | 'google' | 'ollama',

    // Configuration OpenAI
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000')
    },

    // Configuration Anthropic (Claude)
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      model: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
      temperature: parseFloat(process.env.ANTHROPIC_TEMPERATURE || '0.7'),
      maxTokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS || '2000')
    },

    // Configuration Google (Gemini)
    google: {
      apiKey: process.env.GOOGLE_API_KEY || '',
      model: process.env.GOOGLE_MODEL || 'gemini-pro',
      temperature: parseFloat(process.env.GOOGLE_TEMPERATURE || '0.7'),
      maxOutputTokens: parseInt(process.env.GOOGLE_MAX_TOKENS || '2000')
    },

    // Configuration Ollama (local)
    ollama: {
      host: process.env.OLLAMA_HOST || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL || 'llama2',
      temperature: parseFloat(process.env.OLLAMA_TEMPERATURE || '0.7'),
      numCtx: parseInt(process.env.OLLAMA_NUM_CTX || '4096')
    }
  } as AIProviderConfig
};

export default config;
