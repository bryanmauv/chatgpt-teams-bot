import { AIProviderConfig } from './providers/index.js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const config = {
  // ============================================
  // Configuration Azure AD (Microsoft Entra)
  // ============================================
  // Ces identifiants sont obtenus depuis le portail Azure AD (entra.microsoft.com)

  // Application (client) ID depuis "Applications d'entreprise" → "Nouvelle inscription"
  microsoftAppId: process.env.MICROSOFT_APP_ID,

  // Client Secret depuis "Certificats et secrets" → "Nouveau secret client"
  microsoftAppPassword: process.env.MICROSOFT_APP_PASSWORD,

  // Directory (tenant) ID depuis la vue d'ensemble de l'application
  microsoftAppTenantId: process.env.MICROSOFT_APP_TENANT_ID,

  // Port du serveur (défaut: 3978)
  port: process.env.PORT || process.env.port || 3978,

  // ============================================
  // Configuration du Provider d'IA
  // ============================================
  ai: {
    // Type de provider: 'openai', 'anthropic', 'google', 'ollama'
    type: (process.env.AI_PROVIDER || 'openai') as 'openai' | 'anthropic' | 'google' | 'ollama',

    // Configuration OpenAI (ChatGPT)
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
