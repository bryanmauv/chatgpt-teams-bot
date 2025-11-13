/**
 * Provider Google (Gemini)
 * Utilise l'API Google Generative AI pour Gemini Pro
 */

import { BaseAIProvider, AIResponse } from './base.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GoogleConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export class GoogleProvider extends BaseAIProvider {
  private genAI: GoogleGenerativeAI;
  private model: string;
  private temperature: number;
  private maxOutputTokens: number;

  constructor(config: GoogleConfig) {
    super();
    this.genAI = new GoogleGenerativeAI(config.apiKey);
    // Modèles disponibles: gemini-pro, gemini-pro-vision
    this.model = config.model || 'gemini-pro';
    this.temperature = config.temperature || 0.7;
    this.maxOutputTokens = config.maxOutputTokens || 2000;
  }

  async sendMessage(text: string, conversationId: string): Promise<AIResponse> {
    try {
      // Ajouter le message utilisateur à l'historique
      this.addMessageToHistory(conversationId, 'user', text);

      // Récupérer le contexte de conversation
      const conversation = this.getOrCreateConversation(conversationId);

      // Créer le modèle avec configuration
      const model = this.genAI.getGenerativeModel({
        model: this.model,
        generationConfig: {
          temperature: this.temperature,
          maxOutputTokens: this.maxOutputTokens
        }
      });

      // Convertir l'historique au format Google
      const history = conversation.messages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      // Démarrer une session de chat
      const chat = model.startChat({
        history,
        generationConfig: {
          temperature: this.temperature,
          maxOutputTokens: this.maxOutputTokens
        }
      });

      // Envoyer le message
      const result = await chat.sendMessage(text);
      const response = await result.response;
      const responseText = response.text() || 'Désolé, je n\'ai pas pu générer de réponse.';

      // Ajouter la réponse à l'historique
      this.addMessageToHistory(conversationId, 'assistant', responseText);

      return {
        text: responseText,
        conversationId
      };
    } catch (error: any) {
      console.error('Google Provider Error:', error);

      // Gestion des erreurs spécifiques
      if (error.message?.includes('API_KEY_INVALID')) {
        throw new Error('Clé API Google invalide. Vérifiez votre configuration.');
      } else if (error.message?.includes('RATE_LIMIT_EXCEEDED')) {
        throw new Error('Limite de requêtes Google atteinte. Veuillez réessayer plus tard.');
      } else if (error.message?.includes('SAFETY')) {
        throw new Error('Contenu bloqué par les filtres de sécurité Google.');
      }

      throw new Error(`Erreur Google: ${error.message}`);
    }
  }
}
