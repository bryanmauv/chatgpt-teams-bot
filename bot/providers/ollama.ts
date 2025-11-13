/**
 * Provider Ollama
 * Utilise Ollama pour exécuter des modèles d'IA localement (Llama, Mistral, etc.)
 */

import { BaseAIProvider, AIResponse } from './base.js';
import { Ollama } from 'ollama';

export interface OllamaConfig {
  host?: string;
  model?: string;
  temperature?: number;
  numCtx?: number;
}

export class OllamaProvider extends BaseAIProvider {
  private client: Ollama;
  private model: string;
  private temperature: number;
  private numCtx: number;

  constructor(config: OllamaConfig) {
    super();
    this.client = new Ollama({
      host: config.host || 'http://localhost:11434'
    });
    // Modèles disponibles: llama2, llama3, mistral, codellama, phi, etc.
    this.model = config.model || 'llama2';
    this.temperature = config.temperature || 0.7;
    this.numCtx = config.numCtx || 4096; // Taille du contexte
  }

  async sendMessage(text: string, conversationId: string): Promise<AIResponse> {
    try {
      // Ajouter le message utilisateur à l'historique
      this.addMessageToHistory(conversationId, 'user', text);

      // Récupérer le contexte de conversation
      const conversation = this.getOrCreateConversation(conversationId);

      // Convertir les messages au format Ollama
      const ollamaMessages = conversation.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Appeler l'API Ollama
      const response = await this.client.chat({
        model: this.model,
        messages: ollamaMessages,
        options: {
          temperature: this.temperature,
          num_ctx: this.numCtx
        }
      });

      const responseText = response.message?.content || 'Désolé, je n\'ai pas pu générer de réponse.';

      // Ajouter la réponse à l'historique
      this.addMessageToHistory(conversationId, 'assistant', responseText);

      return {
        text: responseText,
        conversationId
      };
    } catch (error: any) {
      console.error('Ollama Provider Error:', error);

      // Gestion des erreurs spécifiques
      if (error.message?.includes('ECONNREFUSED')) {
        throw new Error('Impossible de se connecter à Ollama. Assurez-vous qu\'Ollama est en cours d\'exécution.');
      } else if (error.message?.includes('model') && error.message?.includes('not found')) {
        throw new Error(`Modèle "${this.model}" non trouvé. Exécutez: ollama pull ${this.model}`);
      }

      throw new Error(`Erreur Ollama: ${error.message}`);
    }
  }

  /**
   * Liste les modèles disponibles localement
   */
  async listModels(): Promise<string[]> {
    try {
      const response = await this.client.list();
      return response.models.map(model => model.name);
    } catch (error) {
      console.error('Error listing Ollama models:', error);
      return [];
    }
  }

  /**
   * Vérifie si un modèle est disponible
   */
  async isModelAvailable(modelName: string): Promise<boolean> {
    const models = await this.listModels();
    return models.includes(modelName);
  }
}
