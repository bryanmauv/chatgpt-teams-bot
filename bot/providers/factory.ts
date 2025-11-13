/**
 * Factory pour créer le bon provider d'IA selon la configuration
 */

import { BaseAIProvider } from './base.js';
import { OpenAIProvider, OpenAIConfig } from './openai.js';
import { AnthropicProvider, AnthropicConfig } from './anthropic.js';
import { GoogleProvider, GoogleConfig } from './google.js';
import { OllamaProvider, OllamaConfig } from './ollama.js';

export type AIProviderType = 'openai' | 'anthropic' | 'google' | 'ollama';

export interface AIProviderConfig {
  type: AIProviderType;
  openai?: OpenAIConfig;
  anthropic?: AnthropicConfig;
  google?: GoogleConfig;
  ollama?: OllamaConfig;
}

export class AIProviderFactory {
  static create(config: AIProviderConfig): BaseAIProvider {
    switch (config.type) {
      case 'openai':
        if (!config.openai?.apiKey) {
          throw new Error('OpenAI API key is required');
        }
        return new OpenAIProvider(config.openai);

      case 'anthropic':
        if (!config.anthropic?.apiKey) {
          throw new Error('Anthropic API key is required');
        }
        return new AnthropicProvider(config.anthropic);

      case 'google':
        if (!config.google?.apiKey) {
          throw new Error('Google API key is required');
        }
        return new GoogleProvider(config.google);

      case 'ollama':
        // Ollama n'a pas besoin de clé API
        return new OllamaProvider(config.ollama || {});

      default:
        throw new Error(`Unknown AI provider type: ${config.type}`);
    }
  }
}
