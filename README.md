# 🤖 ChatGPT Teams Bot

Bot Microsoft Teams avec support multi-provider IA - Connectez ChatGPT, Claude, Gemini ou Ollama à Teams!

![ChatGPT Teams](./bot/images/chatgpt-chat-with-context.png)

## 🌟 Fonctionnalités

- ✅ **Support multi-provider IA**:
  - **OpenAI** (GPT-3.5, GPT-4, GPT-4 Turbo)
  - **Anthropic** (Claude 3 Opus, Sonnet, Haiku)
  - **Google** (Gemini Pro, Gemini Pro Vision)
  - **Ollama** (Llama 2/3, Mistral, Mixtral, etc. - gratuit et en local!)

- ✅ **Architecture moderne**:
  - Basé sur **Microsoft Bot Framework** officiel
  - TypeScript avec types stricts
  - Configuration simple via Azure AD
  - Pattern Factory pour les providers IA
  - Gestion d'état avec ConversationState

- ✅ **Sécurité et robustesse**:
  - Authentification Azure AD (Microsoft Entra)
  - Validation des entrées utilisateur
  - Gestion des erreurs complète
  - Rate limiting et timeouts

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ ([Télécharger](https://nodejs.org/))
- Un compte Microsoft 365
- Une clé API pour un provider IA (OpenAI, Anthropic, Google, ou Ollama installé localement)

### Installation

```bash
# 1. Cloner le repository
git clone https://github.com/bryanmauv/chatgpt-teams-bot.git
cd chatgpt-teams-bot/bot

# 2. Installer les dépendances
npm install

# 3. Configurer Azure AD
# Suivez le guide complet: bot/README_AZURE_SETUP.md
# Créez une app dans https://entra.microsoft.com
# Obtenez: App ID, Tenant ID, et Client Secret

# 4. Copier et configurer .env
cp .env.example .env
# Éditez .env avec vos identifiants Azure AD et votre clé IA

# 5. Compiler et démarrer
npm run build
npm run dev
```

## 📖 Documentation complète

### Guide de configuration Azure AD
👉 **[bot/README_AZURE_SETUP.md](./bot/README_AZURE_SETUP.md)** - Guide pas à pas complet pour:
- Créer une application dans Azure AD (https://entra.microsoft.com)
- Configurer l'authentification et les permissions
- Obtenir vos identifiants (App ID, Tenant ID, Secret)
- Tester avec Bot Framework Emulator
- Déployer sur Azure

### Guide multi-provider IA
👉 **[bot/README_MULTI_AI.md](./bot/README_MULTI_AI.md)** - Tout sur les providers IA:
- Configuration d'OpenAI, Anthropic, Google, Ollama
- Comparaison des modèles
- Conseils de performance et coûts

### README du bot
👉 **[bot/README.md](./bot/README.md)** - Documentation technique du bot

## ⚙️ Configuration rapide

### 1. Configuration Azure AD (Obligatoire)

Créez une application dans Azure AD:

1. Allez sur **https://entra.microsoft.com**
2. **Applications d'entreprise** → **Nouvelle inscription**
3. Notez votre **Application (client) ID**
4. Notez votre **Directory (tenant) ID**
5. **Certificats et secrets** → Créez un **secret client**
6. **Authentification** → Ajoutez une **Redirect URI**: `https://localhost:3978/api/messages`

### 2. Configuration du fichier .env

```bash
# Azure AD (OBLIGATOIRE)
MICROSOFT_APP_ID=votre-app-id
MICROSOFT_APP_PASSWORD=votre-secret
MICROSOFT_APP_TENANT_ID=votre-tenant-id

# Provider IA (choisir: openai, anthropic, google, ollama)
AI_PROVIDER=openai

# Clé API du provider choisi
OPENAI_API_KEY=sk-votre-cle
# OU
ANTHROPIC_API_KEY=sk-ant-votre-cle
# OU
GOOGLE_API_KEY=votre-cle
# OU (pour Ollama local)
OLLAMA_HOST=http://localhost:11434
```

## 🧠 Providers IA disponibles

| Provider | Modèles | Coût | Caractéristiques |
|----------|---------|------|------------------|
| **OpenAI** | GPT-3.5, GPT-4 | $$ | Le plus populaire, très performant |
| **Anthropic** | Claude 3 Opus/Sonnet/Haiku | $$ | Excellent pour les longues conversations |
| **Google** | Gemini Pro | $ | Gratuit dans certaines limites |
| **Ollama** | Llama 2/3, Mistral, Mixtral | Gratuit | Exécution locale, pas de frais API |

Pour changer de provider, modifiez simplement `AI_PROVIDER` dans `.env`:

```bash
AI_PROVIDER=openai     # ou: anthropic, google, ollama
```

## 📁 Structure du projet

```
chatgpt-teams-bot/
├── bot/
│   ├── index.ts                  # Point d'entrée principal
│   ├── config.ts                 # Configuration (Azure AD + IA)
│   ├── teamsBot.ts              # Logique du bot Teams
│   ├── providers/               # Providers IA
│   │   ├── openai.ts
│   │   ├── anthropic.ts
│   │   ├── google.ts
│   │   ├── ollama.ts
│   │   ├── base.ts              # Interface commune
│   │   └── factory.ts           # Factory pattern
│   ├── adaptiveCards/           # Cartes Teams
│   ├── .env.example             # Template de configuration
│   ├── README.md                # Documentation du bot
│   ├── README_AZURE_SETUP.md    # Guide Azure AD
│   └── README_MULTI_AI.md       # Guide multi-provider
├── templates/                   # Templates Teams
└── README.md                    # Ce fichier
```

## 🧪 Tester le bot

### Option 1: Bot Framework Emulator (Recommandé)

1. Téléchargez le [Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator/releases)
2. Démarrez votre bot: `npm run dev`
3. Ouvrez l'émulateur et connectez-vous à: `http://localhost:3978/api/messages`
4. Entrez vos identifiants Azure AD
5. Envoyez un message!

### Option 2: Déploiement sur Azure

```bash
# 1. Créer un Azure Bot Service
az bot create --resource-group myResourceGroup --name myBot

# 2. Configurer les variables d'environnement
az webapp config appsettings set ...

# 3. Déployer
npm run build
az webapp deployment source config-zip ...
```

Consultez [bot/README_AZURE_SETUP.md](./bot/README_AZURE_SETUP.md) pour le guide complet.

## 🔧 Scripts disponibles

```bash
cd bot/

npm run dev      # Démarrer en mode développement (hot-reload)
npm run build    # Compiler TypeScript
npm start        # Démarrer en production
npm run watch    # Recharger automatiquement
```

## ❓ FAQ & Dépannage

### Le bot ne démarre pas

- ✅ Vérifiez Node.js 18+: `node --version`
- ✅ Installez les dépendances: `npm install`
- ✅ Vérifiez le fichier `.env`
- ✅ Vérifiez `MICROSOFT_APP_ID` et `MICROSOFT_APP_PASSWORD`

### Erreur "Unauthorized"

- ✅ Vérifiez l'App ID dans Azure AD
- ✅ Vérifiez que le secret client n'a pas expiré
- ✅ Recréez un nouveau secret si nécessaire

### Le bot ne répond pas

- ✅ Vérifiez la clé API du provider IA
- ✅ Consultez les logs: `npm run dev`
- ✅ Testez la route de santé: `http://localhost:3978/health`

### Erreurs de compilation TypeScript

```bash
npm run build    # Recompiler
```

## 📚 Ressources

- [Guide de configuration Azure AD](./bot/README_AZURE_SETUP.md) ⭐ **Commencez ici!**
- [Guide multi-provider IA](./bot/README_MULTI_AI.md)
- [Bot Framework Documentation](https://docs.microsoft.com/azure/bot-service/)
- [Microsoft Teams Developer Docs](https://learn.microsoft.com/microsoftteams/platform/)
- [Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator)

## 🤝 Projets connexes

Vous pourriez aussi aimer:
- [ChatGPT WeChat Bot](https://github.com/formulahendry/chatgpt-wechat-bot) - Bot ChatGPT pour WeChat

## 📄 Licence

MIT

## 🙏 Contribution

Les contributions sont les bienvenues! N'hésitez pas à:
- Ouvrir une issue pour signaler un bug
- Proposer une pull request pour ajouter une fonctionnalité
- Améliorer la documentation

---

**Développé avec ❤️ par Bryan Mauv**

**Basé sur Microsoft Bot Framework**
