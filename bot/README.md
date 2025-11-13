# 🤖 ChatGPT Teams Bot

Bot Microsoft Teams avec support multi-provider IA (OpenAI, Anthropic Claude, Google Gemini, Ollama).

## 📋 Vue d'ensemble

Ce bot Teams utilise le **Microsoft Bot Framework** officiel et permet de discuter avec différents modèles d'IA directement depuis Microsoft Teams:

- **OpenAI** (GPT-3.5, GPT-4)
- **Anthropic** (Claude 3 Opus, Sonnet, Haiku)
- **Google** (Gemini Pro)
- **Ollama** (Llama 2, Mistral, Mixtral, etc. - en local)

## 🚀 Démarrage rapide

### 1️⃣ Configuration Azure AD

**IMPORTANT**: Pour connecter votre bot à Microsoft Teams, vous devez d'abord configurer Azure AD.

👉 **[Suivez le guide complet de configuration Azure AD](./README_AZURE_SETUP.md)**

Ce guide vous accompagne pas à pas pour:
- Créer une application dans Azure AD (https://entra.microsoft.com)
- Obtenir votre Application (client) ID
- Obtenir votre Directory (tenant) ID
- Créer un secret client
- Configurer les permissions

### 2️⃣ Configuration du bot

Une fois Azure AD configuré:

```bash
# 1. Copier le fichier d'exemple
cp .env.example .env

# 2. Éditer .env et remplir vos identifiants
# MICROSOFT_APP_ID=votre-app-id
# MICROSOFT_APP_PASSWORD=votre-secret
# MICROSOFT_APP_TENANT_ID=votre-tenant-id

# 3. Installer les dépendances
npm install

# 4. Compiler le projet
npm run build

# 5. Démarrer le bot
npm run dev
```

### 3️⃣ Tester le bot

Utilisez le **Bot Framework Emulator** pour tester localement:
1. Téléchargez: https://github.com/Microsoft/BotFramework-Emulator/releases
2. Connectez-vous à: `http://localhost:3978/api/messages`
3. Entrez vos identifiants Azure AD

## 📁 Structure du projet

```
bot/
├── index.ts              # Point d'entrée principal
├── config.ts             # Configuration (Azure AD + AI providers)
├── teamsBot.ts          # Logique du bot Teams
├── providers/           # Providers IA
│   ├── openai.ts        # Provider OpenAI
│   ├── anthropic.ts     # Provider Anthropic
│   ├── google.ts        # Provider Google Gemini
│   ├── ollama.ts        # Provider Ollama
│   └── factory.ts       # Factory pattern
├── adaptiveCards/       # Cartes adaptatives Teams
└── .env                 # Configuration (à créer)
```

## ⚙️ Configuration

### Variables d'environnement requises

```bash
# Azure AD (OBLIGATOIRE)
MICROSOFT_APP_ID=votre-app-id
MICROSOFT_APP_PASSWORD=votre-secret
MICROSOFT_APP_TENANT_ID=votre-tenant-id

# Provider IA (choisir un)
AI_PROVIDER=openai  # ou: anthropic, google, ollama

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
```

👉 **Voir [.env.example](./.env.example) pour la configuration complète**

## 🔐 Guide de configuration Azure AD

Pour configurer Azure AD et obtenir vos identifiants:

👉 **[Guide complet: README_AZURE_SETUP.md](./README_AZURE_SETUP.md)**

Ce guide couvre:
- ✅ Création d'une application Azure AD
- ✅ Configuration de l'authentification
- ✅ Création d'un secret client
- ✅ Configuration des permissions API
- ✅ Tests avec Bot Framework Emulator
- ✅ Déploiement sur Azure

## 📝 Scripts disponibles

```bash
npm run dev      # Démarrer en mode développement (avec hot-reload)
npm run build    # Compiler le projet TypeScript
npm start        # Démarrer en mode production
npm run watch    # Démarrer et recharger automatiquement
```

## 🧠 Changer de provider IA

Pour changer de provider IA, modifiez simplement `AI_PROVIDER` dans `.env`:

```bash
# OpenAI (ChatGPT)
AI_PROVIDER=openai

# Anthropic (Claude)
AI_PROVIDER=anthropic

# Google (Gemini)
AI_PROVIDER=google

# Ollama (Local)
AI_PROVIDER=ollama
```

👉 **[Guide multi-provider: README_MULTI_AI.md](./README_MULTI_AI.md)**

## 🔧 Dépannage

### Le bot ne démarre pas

Vérifiez que:
- ✅ Node.js 18+ est installé: `node --version`
- ✅ Les dépendances sont installées: `npm install`
- ✅ Le fichier `.env` existe et contient les bons identifiants
- ✅ `MICROSOFT_APP_ID` et `MICROSOFT_APP_PASSWORD` sont définis

### Erreur "Unauthorized"

- ✅ Vérifiez que l'App ID est correct
- ✅ Vérifiez que le secret client n'a pas expiré
- ✅ Recréez un nouveau secret dans Azure AD si nécessaire

### Le bot ne répond pas

- ✅ Vérifiez que la clé API du provider IA est valide
- ✅ Consultez les logs du serveur
- ✅ Testez la route de santé: `http://localhost:3978/health`

## 📚 Documentation

- [Guide de configuration Azure AD](./README_AZURE_SETUP.md) - **Commencez ici!**
- [Guide multi-provider IA](./README_MULTI_AI.md)
- [Bot Framework Documentation](https://docs.microsoft.com/azure/bot-service/)
- [Microsoft Teams Developer Docs](https://learn.microsoft.com/microsoftteams/platform/)

## 🆘 Support

Besoin d'aide? Consultez:
1. [Guide de configuration Azure AD](./README_AZURE_SETUP.md)
2. [Section dépannage](#-dépannage)
3. Documentation Microsoft officielle

## 📄 Licence

MIT
