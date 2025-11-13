/**
 * Provider OpenAI (ChatGPT)
 * Utilise l'API OpenAI pour GPT-3.5-turbo, GPT-4, etc.
 */

import { BaseAIProvider, AIResponse } from './base.js';
import OpenAI from 'openai';

export interface OpenAIConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export class OpenAIProvider extends BaseAIProvider {
  private client: OpenAI;
  private model: string;
  private temperature: number;
  private maxTokens: number;

  constructor(config: OpenAIConfig) {
    super();
    this.client = new OpenAI({
      apiKey: config.apiKey
    });
    this.model = config.model || 'gpt-3.5-turbo';
    this.temperature = config.temperature || 0.7;
    this.maxTokens = config.maxTokens || 2000;
  }

  async sendMessage(text: string, conversationId: string): Promise<AIResponse> {
    try {
      // Ajouter le message utilisateur à l'historique
      this.addMessageToHistory(conversationId, 'user', text);

      // Récupérer le contexte de conversation
      const conversation = this.getOrCreateConversation(conversationId);

      // Appeler l'API OpenAI
      const completion = await this.client.chat.completions.create({
        model: this.model,
        messages: conversation.messages,
        temperature: this.temperature,
        max_tokens: this.maxTokens
      });

      const responseText = completion.choices[0]?.message?.content || 'Désolé, je n\'ai pas pu générer de réponse.';

      // Ajouter la réponse à l'historique
      this.addMessageToHistory(conversationId, 'assistant', responseText);

      return {
        text: responseText,
        conversationId,
        messageId: completion.id
      };
    } catch (error: any) {
      console.error('OpenAI Provider Error:', error);

      // Gestion des erreurs spécifiques
      if (error.status === 401) {
        throw new Error('Clé API OpenAI invalide. Vérifiez votre configuration.');
      } else if (error.status === 429) {
        throw new Error('Limite de requêtes OpenAI atteinte. Veuillez réessayer plus tard.');
      } else if (error.status === 500) {
        throw new Error('Erreur serveur OpenAI. Veuillez réessayer plus tard.');
      }

      throw new Error(`Erreur OpenAI: ${error.message}`);
    }
  }
}
