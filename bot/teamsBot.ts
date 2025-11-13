import {
  TeamsActivityHandler,
  CardFactory,
  TurnContext,
} from "botbuilder";
import rawWelcomeCard from "./adaptiveCards/welcome.json" with { type: "json" };
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { AIProviderFactory, BaseAIProvider } from './providers/index.js';
import config from "./config.js";

export class TeamsBot extends TeamsActivityHandler {
  private aiProvider: BaseAIProvider;

  constructor() {
    super();

    // Créer le provider d'IA selon la configuration
    console.log(`Initializing AI Provider: ${config.ai.type}`);
    this.aiProvider = AIProviderFactory.create(config.ai);

    this.onMessage(async (context, next) => {
      console.log("Running with Message Activity.");

      try {
        // Extraire le texte du message
        let txt = context.activity.text;
        const removedMentionText = TurnContext.removeRecipientMention(context.activity);
        if (removedMentionText) {
          // Supprimer les retours à la ligne
          txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
        }

        // Validation de l'entrée
        if (!txt || txt.trim().length === 0) {
          await context.sendActivity("Veuillez envoyer un message valide.");
          await next();
          return;
        }

        // Limiter la longueur du message
        if (txt.length > 4000) {
          await context.sendActivity("Votre message est trop long. Veuillez limiter à 4000 caractères.");
          await next();
          return;
        }

        // Créer un ID de conversation unique par utilisateur/conversation
        // CORRECTION DU BUG: utiliser un ID unique par conversation au lieu d'un parentMessageId global
        const conversationId = `${context.activity.conversation.id}_${context.activity.from.id}`;

        console.log(`Processing message from conversation: ${conversationId}`);

        // Envoyer un indicateur de frappe pendant le traitement
        await context.sendActivities([{ type: 'typing' }]);

        // Envoyer le message au provider d'IA
        const response = await this.aiProvider.sendMessage(txt, conversationId);

        // Envoyer la réponse à l'utilisateur
        await context.sendActivity(response.text);

      } catch (error: any) {
        console.error('Error processing message:', error);

        // Messages d'erreur conviviaux
        let errorMessage = "Désolé, une erreur s'est produite lors du traitement de votre message.";

        if (error.message?.includes('API key') || error.message?.includes('Clé API')) {
          errorMessage = "Erreur de configuration: Clé API invalide ou manquante.";
        } else if (error.message?.includes('rate limit') || error.message?.includes('limite')) {
          errorMessage = "Limite de requêtes atteinte. Veuillez réessayer dans quelques instants.";
        } else if (error.message?.includes('Ollama')) {
          errorMessage = "Impossible de se connecter au service Ollama local.";
        }

        await context.sendActivity(errorMessage);
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          const card = AdaptiveCards.declareWithoutData(rawWelcomeCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
      }
      await next();
    });
  }
}
