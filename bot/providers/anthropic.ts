/**
 * Provider Anthropic (Claude)
 * Utilise l'API Anthropic pour Claude 3 (Opus, Sonnet, Haiku)
 */

import { BaseAIProvider, AIResponse } from './base.js';
import Anthropic from '@anthropic-ai/sdk';

export interface AnthropicConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export class AnthropicProvider extends BaseAIProvider {
  private client: Anthropic;
  private model: string;
  private temperature: number;
  private maxTokens: number;

  constructor(config: AnthropicConfig) {
    super();
    this.client = new Anthropic({
      apiKey: config.apiKey
    });
    // Modèles disponibles: claude-3-opus-20240229, claude-3-sonnet-20240229, claude-3-haiku-20240307
    this.model = config.model || 'claude-3-sonnet-20240229';
    this.temperature = config.temperature || 0.7;
    this.maxTokens = config.maxTokens || 2000;
  }

  async sendMessage(text: string, conversationId: string): Promise<AIResponse> {
    try {
      // Ajouter le message utilisateur à l'historique
      this.addMessageToHistory(conversationId, 'user', text);

      // Récupérer le contexte de conversation
      const conversation = this.getOrCreateConversation(conversationId);

      // Convertir les messages au format Anthropic
      const anthropicMessages = conversation.messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

      // Appeler l'API Anthropic
      const message = await this.client.messages.create({
        model: this.model,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        messages: anthropicMessages
      });

      const responseText = message.content[0]?.type === 'text'
        ? message.content[0].text
        : 'Désolé, je n\'ai pas pu générer de réponse.';

      // Ajouter la réponse à l'historique
      this.addMessageToHistory(conversationId, 'assistant', responseText);

      return {
        text: responseText,
        conversationId,
        messageId: message.id
      };
    } catch (error: any) {
      console.error('Anthropic Provider Error:', error);

      // Gestion des erreurs spécifiques
      if (error.status === 401) {
        throw new Error('Clé API Anthropic invalide. Vérifiez votre configuration.');
      } else if (error.status === 429) {
        throw new Error('Limite de requêtes Anthropic atteinte. Veuillez réessayer plus tard.');
      } else if (error.status === 529) {
        throw new Error('API Anthropic surchargée. Veuillez réessayer plus tard.');
      }

      throw new Error(`Erreur Anthropic: ${error.message}`);
    }
  }
}
