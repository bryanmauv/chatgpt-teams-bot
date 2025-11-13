/**
 * Interface de base pour tous les providers d'IA
 * Permet d'utiliser différents modèles (OpenAI, Anthropic, Google, Ollama)
 */

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  text: string;
  conversationId?: string;
  messageId?: string;
}

export interface ConversationContext {
  conversationId: string;
  messages: AIMessage[];
}

export abstract class BaseAIProvider {
  protected conversations: Map<string, ConversationContext>;

  constructor() {
    this.conversations = new Map();
  }

  /**
   * Envoie un message au modèle d'IA
   * @param text Le texte du message utilisateur
   * @param conversationId Identifiant unique de la conversation
   * @returns La réponse de l'IA
   */
  abstract sendMessage(text: string, conversationId: string): Promise<AIResponse>;

  /**
   * Obtient ou crée un contexte de conversation
   */
  protected getOrCreateConversation(conversationId: string): ConversationContext {
    if (!this.conversations.has(conversationId)) {
      this.conversations.set(conversationId, {
        conversationId,
        messages: []
      });
    }
    return this.conversations.get(conversationId)!;
  }

  /**
   * Ajoute un message à l'historique de conversation
   */
  protected addMessageToHistory(conversationId: string, role: 'user' | 'assistant', content: string): void {
    const conversation = this.getOrCreateConversation(conversationId);
    conversation.messages.push({ role, content });

    // Limiter l'historique à 20 messages pour éviter de dépasser les limites de tokens
    if (conversation.messages.length > 20) {
      conversation.messages = conversation.messages.slice(-20);
    }
  }

  /**
   * Réinitialise une conversation
   */
  resetConversation(conversationId: string): void {
    this.conversations.delete(conversationId);
  }

  /**
   * Nettoie toutes les conversations
   */
  clearAll(): void {
    this.conversations.clear();
  }
}
