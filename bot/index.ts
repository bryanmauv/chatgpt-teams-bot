// ============================================
// ChatGPT Teams Bot - Main Entry Point
// ============================================
// Bot Framework based Microsoft Teams bot with multi-AI provider support

// Polyfill pour crypto (requis pour les dépendances Azure en mode ESM)
import crypto from "crypto";
if (typeof globalThis.crypto === 'undefined') {
  (globalThis as any).crypto = crypto;
}

import express from "express";
import { BotFrameworkAdapter, TurnContext, MemoryStorage, ConversationState, UserState } from "botbuilder";
import { TeamsBot } from "./teamsBot.js";
import config from "./config.js";

// Validation de la configuration
if (!config.microsoftAppId || !config.microsoftAppPassword) {
  console.error('❌ ERREUR: Les identifiants Azure AD sont requis!');
  console.error('   Veuillez configurer MICROSOFT_APP_ID et MICROSOFT_APP_PASSWORD dans votre fichier .env');
  console.error('   Consultez le README.md pour les instructions de configuration Azure AD');
  process.exit(1);
}

// ============================================
// Configuration du Bot Framework Adapter
// ============================================
// L'adaptateur gère la communication avec le Bot Framework Service
const adapter = new BotFrameworkAdapter({
  appId: config.microsoftAppId,
  appPassword: config.microsoftAppPassword,
});

// ============================================
// Gestion globale des erreurs
// ============================================
const onTurnErrorHandler = async (context: TurnContext, error: Error) => {
  // Log l'erreur dans la console
  console.error(`\n❌ [onTurnError] Erreur non gérée: ${error}`);
  console.error(error.stack);

  // Envoyer une trace activity pour le Bot Framework Emulator
  await context.sendTraceActivity(
    "OnTurnError Trace",
    `${error}`,
    "https://www.botframework.com/schemas/error",
    "TurnError"
  );

  // Informer l'utilisateur de l'erreur
  await context.sendActivity(`⚠️ Le bot a rencontré une erreur: ${error.message}`);
  await context.sendActivity("Si le problème persiste, contactez l'administrateur.");
};

adapter.onTurnError = onTurnErrorHandler;

// ============================================
// State Management (optionnel mais recommandé)
// ============================================
// Utilisation du MemoryStorage pour le développement
// En production, utilisez Azure Blob Storage ou Cosmos DB
const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);
const userState = new UserState(memoryStorage);

// ============================================
// Création du Bot
// ============================================
const bot = new TeamsBot();

// ============================================
// Configuration du serveur HTTP
// ============================================
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de santé pour vérifier que le bot est en ligne
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    aiProvider: config.ai.type,
    version: '2.0.0'
  });
});

// Route principale pour les messages du bot
app.post('/api/messages', async (req, res) => {
  await adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});

// ============================================
// Démarrage du serveur
// ============================================
const PORT = config.port;
app.listen(PORT, () => {
  console.log('\n🤖 ============================================');
  console.log('   ChatGPT Teams Bot - Démarré avec succès!');
  console.log('   ============================================');
  console.log(`   📡 Port: ${PORT}`);
  console.log(`   🧠 AI Provider: ${config.ai.type}`);
  console.log(`   🔐 App ID: ${config.microsoftAppId?.substring(0, 8)}...`);
  console.log('   ============================================\n');
  console.log(`   ✅ Le bot est prêt à recevoir des messages sur:`);
  console.log(`      http://localhost:${PORT}/api/messages\n`);
});
