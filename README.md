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

---

## 📋 Table des matières

1. [Prérequis](#-prérequis)
2. [Installation complète](#-installation-complète)
3. [Configuration Microsoft Azure AD](#-étape-1--configuration-microsoft-azure-ad)
4. [Configuration des providers IA](#-étape-2--configuration-des-providers-ia)
5. [Déploiement dans Microsoft Teams](#-étape-3--déploiement-dans-microsoft-teams)
6. [Tests et validation](#-tester-le-bot)
7. [Dépannage](#-faq--dépannage)

---

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir:

- **Node.js 18.0 ou supérieur** ([Télécharger](https://nodejs.org/))
  - ✅ Testé avec Node.js 18.19.0, 20.x et 22.x
  - Vérifiez votre version: `node --version`
- **Un compte Microsoft 365** (avec droits administrateur pour créer des apps)
- **Une clé API** pour au moins un provider IA:
  - [OpenAI API Key](https://platform.openai.com/api-keys)
  - [Anthropic API Key](https://console.anthropic.com/)
  - [Google AI API Key](https://makersuite.google.com/app/apikey)
  - [Ollama](https://ollama.ai/) (installation locale, gratuit)

---

## 🚀 Installation complète

### Installation du projet

```bash
# 1. Cloner le repository
git clone https://github.com/bryanmauv/chatgpt-teams-bot.git
cd chatgpt-teams-bot/bot

# 2. Installer les dépendances
npm install

# 3. Copier le fichier de configuration
cp .env.example .env
```

Maintenant, suivez les étapes de configuration ci-dessous.

---

## 🔐 ÉTAPE 1 : Configuration Microsoft Azure AD

Pour connecter votre bot à Microsoft Teams, vous devez créer une application dans Azure AD (Microsoft Entra).

### 1.1 Créer une application Azure AD

1. **Accédez au portail Azure AD**
   - Allez sur **https://entra.microsoft.com**
   - Connectez-vous avec votre compte Microsoft 365 (compte admin)

2. **Créer une nouvelle inscription d'application**
   - Dans le menu de gauche: **Applications** → **Inscriptions d'applications**
   - Cliquez sur **+ Nouvelle inscription**

3. **Remplir le formulaire**
   - **Nom**: `ChatGPT Teams Bot` (ou le nom de votre choix)
   - **Types de comptes pris en charge**:
     - Pour une seule organisation: **"Comptes dans cet annuaire organisationnel uniquement"**
     - Pour plusieurs organisations: **"Comptes dans n'importe quel annuaire organisationnel"**
   - **URI de redirection**: Laissez vide pour l'instant
   - Cliquez sur **Inscrire**

### 1.2 Noter vos identifiants

Une fois créée, vous verrez la page **"Vue d'ensemble"**. Notez ces informations:

```
📝 Application (client) ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
📝 Directory (tenant) ID:   xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 1.3 Créer un secret client

1. Dans le menu de gauche, cliquez sur **Certificats et secrets**
2. Sous **Secrets client**, cliquez sur **+ Nouveau secret client**
3. Remplissez:
   - **Description**: `ChatGPT Teams Bot Secret`
   - **Expire**: 24 mois (recommandé)
4. Cliquez sur **Ajouter**
5. **⚠️ IMPORTANT**: Copiez immédiatement la **Valeur** du secret (vous ne pourrez plus la voir!)

```
📝 Client Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 1.4 Configurer l'authentification

1. Cliquez sur **Authentification** dans le menu de gauche
2. Cliquez sur **+ Ajouter une plateforme** → **Web**
3. Ajoutez les URI de redirection:
   - Développement: `https://localhost:3978/api/messages`
   - Production: `https://votre-domaine.com/api/messages`
4. Cochez **Jetons d'ID** sous "Octroi implicite"
5. Cliquez sur **Configurer**

### 1.5 Configurer les permissions API

1. Cliquez sur **Autorisations de l'API**
2. Cliquez sur **+ Ajouter une autorisation**
3. Sélectionnez **Microsoft Graph**
4. Choisissez **Autorisations déléguées**
5. Ajoutez ces permissions:
   - `User.Read` (lecture du profil)
   - `Chat.Read` (optionnel)
   - `Chat.ReadWrite` (optionnel)
6. Cliquez sur **Ajouter les autorisations**
7. Cliquez sur **Accorder le consentement de l'administrateur**

### 1.6 Mettre à jour le fichier .env

Ouvrez le fichier `.env` et ajoutez vos identifiants Azure AD:

```bash
# Configuration Azure AD
MICROSOFT_APP_ID=votre-application-client-id
MICROSOFT_APP_PASSWORD=votre-client-secret
MICROSOFT_APP_TENANT_ID=votre-directory-tenant-id

# Port du serveur
PORT=3978
```

👉 **Guide détaillé**: [bot/README_AZURE_SETUP.md](./bot/README_AZURE_SETUP.md)

---

## 🤖 ÉTAPE 2 : Configuration des Providers IA

Choisissez un ou plusieurs providers IA et configurez-les dans votre fichier `.env`.

### Option A: OpenAI (ChatGPT) 🔥 **Recommandé**

**Modèles**: GPT-3.5 Turbo, GPT-4, GPT-4 Turbo
**Coût**: $$ (payant, à l'usage)

#### Obtenir une clé API OpenAI

1. **Créer un compte OpenAI**
   - Allez sur **https://platform.openai.com/signup**
   - Créez un compte ou connectez-vous

2. **Obtenir votre clé API**
   - Allez sur **https://platform.openai.com/api-keys**
   - Cliquez sur **+ Create new secret key**
   - Nommez votre clé (ex: "Teams Bot")
   - **⚠️ Copiez immédiatement** la clé (elle commence par `sk-`)

3. **Ajouter des crédits**
   - Allez sur **https://platform.openai.com/account/billing**
   - Ajoutez un mode de paiement et des crédits (minimum $5)

#### Configuration dans .env

```bash
# Provider IA
AI_PROVIDER=openai

# OpenAI Configuration
OPENAI_API_KEY=sk-votre-cle-api-openai
OPENAI_MODEL=gpt-3.5-turbo
# Autres modèles disponibles:
# - gpt-4 (plus puissant, plus cher)
# - gpt-4-turbo-preview (équilibré)
# - gpt-3.5-turbo-16k (contexte étendu)
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=2000
```

**Coûts approximatifs**:
- GPT-3.5 Turbo: $0.002/1K tokens (~$0.001 par message)
- GPT-4: $0.06/1K tokens (~$0.03 par message)

---

### Option B: Google Gemini 💚 **Gratuit**

**Modèles**: Gemini Pro, Gemini Pro Vision
**Coût**: Gratuit (avec limites)

#### Obtenir une clé API Google AI

1. **Créer un compte Google AI Studio**
   - Allez sur **https://makersuite.google.com/app/apikey**
   - Connectez-vous avec votre compte Google

2. **Créer une clé API**
   - Cliquez sur **Create API Key**
   - Sélectionnez un projet Google Cloud (ou créez-en un)
   - **Copiez votre clé API**

3. **Activer l'API** (si demandé)
   - Allez sur **https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com**
   - Cliquez sur **Activer**

#### Configuration dans .env

```bash
# Provider IA
AI_PROVIDER=google

# Google Gemini Configuration
GOOGLE_API_KEY=votre-cle-api-google
GOOGLE_MODEL=gemini-pro
# Autres modèles:
# - gemini-pro-vision (support images)
GOOGLE_TEMPERATURE=0.7
GOOGLE_MAX_TOKENS=2000
```

**Limites gratuites**:
- 60 requêtes par minute
- 1 million de tokens par mois (gratuit)

---

### Option C: Anthropic Claude 🧠 **Puissant**

**Modèles**: Claude 3 Opus, Sonnet, Haiku
**Coût**: $$ (payant, à l'usage)

#### Obtenir une clé API Anthropic

1. **Créer un compte Anthropic**
   - Allez sur **https://console.anthropic.com/**
   - Créez un compte

2. **Obtenir votre clé API**
   - Allez sur **Settings** → **API Keys**
   - Cliquez sur **Create Key**
   - Nommez votre clé (ex: "Teams Bot")
   - **Copiez la clé** (elle commence par `sk-ant-`)

3. **Ajouter des crédits**
   - Allez dans **Billing**
   - Ajoutez un mode de paiement

#### Configuration dans .env

```bash
# Provider IA
AI_PROVIDER=anthropic

# Anthropic Claude Configuration
ANTHROPIC_API_KEY=sk-ant-votre-cle-api-anthropic
ANTHROPIC_MODEL=claude-3-sonnet-20240229
# Autres modèles:
# - claude-3-opus-20240229 (le plus puissant)
# - claude-3-sonnet-20240229 (équilibré)
# - claude-3-haiku-20240307 (le plus rapide)
ANTHROPIC_TEMPERATURE=0.7
ANTHROPIC_MAX_TOKENS=2000
```

**Coûts approximatifs**:
- Claude 3 Haiku: $0.25/1M tokens
- Claude 3 Sonnet: $3/1M tokens
- Claude 3 Opus: $15/1M tokens

---

### Option D: Ollama 🆓 **Gratuit et Local**

**Modèles**: Llama 2/3, Mistral, Mixtral, CodeLlama, Phi, etc.
**Coût**: Gratuit (exécution locale)

#### Installer Ollama

1. **Télécharger Ollama**
   - Allez sur **https://ollama.ai/**
   - Téléchargez et installez pour votre système:
     - **Windows**: Télécharger l'installateur
     - **macOS**: `brew install ollama`
     - **Linux**: `curl -fsSL https://ollama.ai/install.sh | sh`

2. **Démarrer Ollama**
   ```bash
   # Démarrer le service Ollama
   ollama serve
   ```

3. **Télécharger un modèle**
   ```bash
   # Llama 2 (7B) - Recommandé pour commencer
   ollama pull llama2

   # Autres modèles populaires:
   ollama pull llama3        # Llama 3 (plus récent)
   ollama pull mistral       # Mistral 7B (très bon)
   ollama pull mixtral       # Mixtral 8x7B (puissant)
   ollama pull codellama     # Spécialisé code
   ollama pull phi           # Microsoft Phi-2 (léger)
   ```

4. **Tester le modèle**
   ```bash
   ollama run llama2 "Hello, how are you?"
   ```

#### Configuration dans .env

```bash
# Provider IA
AI_PROVIDER=ollama

# Ollama Configuration
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama2
# Autres modèles (après téléchargement):
# - llama3, mistral, mixtral, codellama, phi, gemma
OLLAMA_TEMPERATURE=0.7
OLLAMA_NUM_CTX=4096
```

**Avantages**:
- ✅ 100% gratuit
- ✅ Aucun frais API
- ✅ Données restent locales
- ✅ Fonctionne hors ligne

**Inconvénients**:
- ❌ Nécessite une machine puissante (8GB+ RAM)
- ❌ Moins performant que GPT-4 ou Claude

---

## 📦 Compiler et démarrer le bot

Une fois Azure AD et le provider IA configurés:

```bash
# 1. Compiler le projet TypeScript
npm run build

# 2. Démarrer en mode développement
npm run dev

# Vous devriez voir:
# 🤖 ============================================
#    ChatGPT Teams Bot - Démarré avec succès!
#    ============================================
#    📡 Port: 3978
#    🧠 AI Provider: openai
#    🔐 App ID: 12345678...
#    ============================================
```

---

## 🧪 ÉTAPE 3 : Déploiement dans Microsoft Teams

### Option 1: Tester avec Bot Framework Emulator (Recommandé pour le dev)

1. **Télécharger Bot Framework Emulator**
   - Allez sur **https://github.com/Microsoft/BotFramework-Emulator/releases**
   - Téléchargez la dernière version pour votre OS

2. **Configurer l'émulateur**
   - Ouvrez Bot Framework Emulator
   - Cliquez sur **Open Bot**
   - Entrez:
     - **Bot URL**: `http://localhost:3978/api/messages`
     - **Microsoft App ID**: Votre `MICROSOFT_APP_ID`
     - **Microsoft App password**: Votre `MICROSOFT_APP_PASSWORD`
   - Cliquez sur **Connect**

3. **Tester le bot**
   - Envoyez un message dans l'émulateur
   - Le bot devrait répondre avec votre provider IA!

### Option 2: Déployer sur Azure (Production)

#### A. Créer un Azure Bot Service

1. **Via le portail Azure**
   - Allez sur **https://portal.azure.com**
   - Recherchez "Azure Bot" et créez-en un nouveau
   - Configurez:
     - **Bot handle**: Nom unique
     - **Subscription**: Votre abonnement
     - **Resource group**: Créez-en un nouveau
     - **Pricing tier**: F0 (gratuit) ou S1
     - **Microsoft App ID**: Utilisez celui créé dans Azure AD

2. **Via Azure CLI**
   ```bash
   # Se connecter à Azure
   az login

   # Créer un groupe de ressources
   az group create --name myResourceGroup --location westeurope

   # Créer le bot
   az bot create \
     --resource-group myResourceGroup \
     --name myChatGPTBot \
     --kind webapp \
     --location westeurope \
     --sku F0
   ```

#### B. Déployer votre code

```bash
# 1. Compiler le projet
npm run build

# 2. Créer un fichier zip
zip -r deploy.zip .

# 3. Déployer sur Azure
az webapp deployment source config-zip \
  --resource-group myResourceGroup \
  --name myChatGPTBot \
  --src ./deploy.zip
```

#### C. Configurer les variables d'environnement sur Azure

```bash
az webapp config appsettings set \
  --resource-group myResourceGroup \
  --name myChatGPTBot \
  --settings \
    MICROSOFT_APP_ID="votre-app-id" \
    MICROSOFT_APP_PASSWORD="votre-secret" \
    MICROSOFT_APP_TENANT_ID="votre-tenant-id" \
    AI_PROVIDER="openai" \
    OPENAI_API_KEY="votre-openai-key"
```

### Option 3: Ajouter le bot à Microsoft Teams

1. **Créer un package d'application Teams**
   - Le projet contient déjà un template dans `templates/`
   - Modifiez le fichier `manifest.json`:
     - Remplacez `{BOT_ID}` par votre `MICROSOFT_APP_ID`
     - Remplacez `{BOT_ENDPOINT}` par votre URL Azure

2. **Créer le fichier ZIP**
   ```bash
   cd templates/appPackage
   zip -r teams-app.zip *
   ```

3. **Installer dans Teams**
   - Ouvrez Microsoft Teams
   - Cliquez sur **Apps** dans la barre latérale
   - Cliquez sur **Upload a custom app** (si disponible)
   - Ou envoyez le ZIP à votre administrateur Teams

4. **Démarrer une conversation**
   - Cherchez votre bot dans Teams
   - Démarrez une conversation
   - Le bot répondra avec votre provider IA!

---

## 🔧 Scripts disponibles

```bash
cd bot/

npm run dev      # Démarrer en mode développement (hot-reload)
npm run build    # Compiler TypeScript
npm start        # Démarrer en production
npm run watch    # Recharger automatiquement
```

---

## 🧠 Comparaison des Providers IA

| Provider | Modèle | Coût/Message | Vitesse | Qualité | Recommandé pour |
|----------|--------|--------------|---------|---------|-----------------|
| **OpenAI** | GPT-3.5 | ~$0.001 | ⚡⚡⚡ | ⭐⭐⭐⭐ | Usage général, production |
| **OpenAI** | GPT-4 | ~$0.03 | ⚡⚡ | ⭐⭐⭐⭐⭐ | Tâches complexes, analyse |
| **Google** | Gemini Pro | Gratuit* | ⚡⚡⚡ | ⭐⭐⭐ | Tests, projets personnels |
| **Anthropic** | Claude 3 Sonnet | ~$0.01 | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | Conversations longues |
| **Ollama** | Llama 2 | Gratuit | ⚡ | ⭐⭐⭐ | Hors ligne, confidentialité |

\* Avec limites (60 req/min, 1M tokens/mois)

---

## ❓ FAQ & Dépannage

### Le bot ne démarre pas

**Erreur**: `❌ ERREUR: Les identifiants Azure AD sont requis!`

**Solution**:
- Vérifiez que le fichier `.env` existe dans `bot/`
- Vérifiez que `MICROSOFT_APP_ID` et `MICROSOFT_APP_PASSWORD` sont définis
- Vérifiez qu'il n'y a pas d'espaces dans les valeurs

### Erreur "Unauthorized" dans l'émulateur

**Solution**:
- Vérifiez que l'App ID est correct (copiez-le depuis Azure AD)
- Vérifiez que le secret client n'a pas expiré
- Recréez un nouveau secret dans Azure AD si nécessaire
- Vérifiez qu'il n'y a pas de guillemets autour des valeurs dans `.env`

### Le bot ne répond pas

**Solution**:
1. Vérifiez que la clé API du provider est valide
2. Pour OpenAI: vérifiez que vous avez des crédits
3. Pour Ollama: vérifiez que `ollama serve` est en cours d'exécution
4. Consultez les logs: `npm run dev`
5. Testez la route de santé: `curl http://localhost:3978/health`

### Erreur de compilation TypeScript

```bash
# Nettoyer et recompiler
rm -rf lib/ node_modules/
npm install
npm run build
```

### Le bot est lent

**Solutions**:
- **OpenAI**: Utilisez `gpt-3.5-turbo` au lieu de `gpt-4`
- **Ollama**: Utilisez un modèle plus léger (`phi` au lieu de `mixtral`)
- Réduisez `MAX_TOKENS` dans `.env`
- Augmentez la `TEMPERATURE` pour des réponses plus courtes

### Erreur "Module not found"

```bash
# Réinstaller les dépendances
npm install
```

---

## 📚 Documentation détaillée

- **[bot/README_AZURE_SETUP.md](./bot/README_AZURE_SETUP.md)** - Guide complet Azure AD (70+ étapes)
- **[bot/README_MULTI_AI.md](./bot/README_MULTI_AI.md)** - Comparaison détaillée des providers IA
- **[bot/README.md](./bot/README.md)** - Documentation technique du bot

## 📚 Ressources externes

- [Bot Framework Documentation](https://docs.microsoft.com/azure/bot-service/)
- [Microsoft Teams Developer Docs](https://learn.microsoft.com/microsoftteams/platform/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Anthropic Claude Documentation](https://docs.anthropic.com/)
- [Google AI Studio](https://ai.google.dev/)
- [Ollama Documentation](https://github.com/jmorganca/ollama)

---

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
