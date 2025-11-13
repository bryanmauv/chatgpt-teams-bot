# 🤖 Guide d'Installation Multi-Providers IA

Ce guide vous explique comment configurer le bot Teams pour utiliser différents fournisseurs d'IA :
- **OpenAI** (ChatGPT) - GPT-3.5, GPT-4
- **Anthropic** (Claude) - Claude 3 Opus, Sonnet, Haiku
- **Google** (Gemini) - Gemini Pro
- **Ollama** (Local) - Llama 2/3, Mistral, etc.

---

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Installation OpenAI](#1-openai-chatgpt)
3. [Installation Anthropic](#2-anthropic-claude)
4. [Installation Google](#3-google-gemini)
5. [Installation Ollama](#4-ollama-local)
6. [Configuration du Bot](#configuration-du-bot)
7. [Comparaison des Providers](#comparaison-des-providers)

---

## Prérequis

### Installation de Base (Debian 12)

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation de Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo bash -
sudo apt install -y nodejs

# Vérification
node --version  # v18.x.x
npm --version   # 9.x.x

# Cloner le projet
git clone https://github.com/formulahendry/chatgpt-teams-bot.git
cd chatgpt-teams-bot/bot

# Installer les dépendances
npm install
```

---

## 1. OpenAI (ChatGPT)

### Avantages
- ✅ Modèles très performants (GPT-4)
- ✅ Grande base de connaissances
- ✅ Réponses cohérentes et naturelles
- ✅ Support de nombreux langages

### Inconvénients
- ❌ Payant (facturation à l'usage)
- ❌ Nécessite une connexion internet
- ❌ Limites de requêtes strictes

### Configuration

#### Étape 1 : Obtenir une Clé API

1. Allez sur [OpenAI Platform](https://platform.openai.com/)
2. Créez un compte ou connectez-vous
3. Allez dans **API keys** → **Create new secret key**
4. Copiez la clé (commençant par `sk-...`)

#### Étape 2 : Ajouter des Crédits

1. Allez dans **Billing** → **Payment methods**
2. Ajoutez une carte de crédit
3. Ajoutez au moins $5 de crédits

#### Étape 3 : Configuration

```bash
# Créer le fichier .env
cd ~/chatgpt-teams-bot/bot
nano .env
```

Contenu du fichier :
```bash
# Azure Bot Service
BOT_ID=votre-microsoft-app-id
BOT_PASSWORD=votre-client-secret

# Choisir OpenAI
AI_PROVIDER=openai

# Configuration OpenAI
OPENAI_API_KEY=sk-proj-votre-cle-ici
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=2000
```

#### Modèles Disponibles

| Modèle | Description | Prix (par 1M tokens) |
|--------|-------------|----------------------|
| `gpt-3.5-turbo` | Rapide et économique | $0.50 / $1.50 |
| `gpt-3.5-turbo-16k` | Contexte plus large | $3.00 / $4.00 |
| `gpt-4` | Plus intelligent | $30.00 / $60.00 |
| `gpt-4-turbo` | GPT-4 optimisé | $10.00 / $30.00 |

#### Démarrage

```bash
npm run build
npm start
```

---

## 2. Anthropic (Claude)

### Avantages
- ✅ Excellente compréhension contextuelle
- ✅ Bonnes capacités de raisonnement
- ✅ Limite de tokens élevée (200k)
- ✅ Bonne gestion de la sécurité

### Inconvénients
- ❌ Payant (facturation à l'usage)
- ❌ Nécessite une connexion internet
- ❌ API en beta (évolutions possibles)

### Configuration

#### Étape 1 : Obtenir une Clé API

1. Allez sur [Anthropic Console](https://console.anthropic.com/)
2. Créez un compte
3. Allez dans **API Keys** → **Create Key**
4. Copiez la clé (commençant par `sk-ant-...`)

#### Étape 2 : Ajouter des Crédits

1. Allez dans **Billing**
2. Ajoutez une carte de crédit
3. Ajoutez des crédits (minimum $5)

#### Étape 3 : Configuration

```bash
nano .env
```

Contenu :
```bash
# Azure Bot Service
BOT_ID=votre-microsoft-app-id
BOT_PASSWORD=votre-client-secret

# Choisir Anthropic
AI_PROVIDER=anthropic

# Configuration Anthropic
ANTHROPIC_API_KEY=sk-ant-votre-cle-ici
ANTHROPIC_MODEL=claude-3-sonnet-20240229
ANTHROPIC_TEMPERATURE=0.7
ANTHROPIC_MAX_TOKENS=2000
```

#### Modèles Disponibles

| Modèle | Description | Prix (par 1M tokens) |
|--------|-------------|----------------------|
| `claude-3-haiku-20240307` | Rapide et économique | $0.25 / $1.25 |
| `claude-3-sonnet-20240229` | Équilibré | $3.00 / $15.00 |
| `claude-3-opus-20240229` | Plus puissant | $15.00 / $75.00 |

#### Démarrage

```bash
npm run build
npm start
```

---

## 3. Google (Gemini)

### Avantages
- ✅ **Gratuit** jusqu'à 60 requêtes/minute
- ✅ Multimodal (texte + images)
- ✅ Bonnes performances
- ✅ Intégration Google

### Inconvénients
- ❌ Nécessite une connexion internet
- ❌ Moins mature qu'OpenAI/Anthropic
- ❌ Disponibilité géographique limitée

### Configuration

#### Étape 1 : Obtenir une Clé API

1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Connectez-vous avec un compte Google
3. Cliquez sur **Get API Key** → **Create API Key**
4. Copiez la clé

#### Étape 2 : Configuration

```bash
nano .env
```

Contenu :
```bash
# Azure Bot Service
BOT_ID=votre-microsoft-app-id
BOT_PASSWORD=votre-client-secret

# Choisir Google
AI_PROVIDER=google

# Configuration Google
GOOGLE_API_KEY=votre-cle-api-google
GOOGLE_MODEL=gemini-pro
GOOGLE_TEMPERATURE=0.7
GOOGLE_MAX_TOKENS=2000
```

#### Modèles Disponibles

| Modèle | Description | Gratuit |
|--------|-------------|---------|
| `gemini-pro` | Texte uniquement | ✅ Oui (60 req/min) |
| `gemini-pro-vision` | Texte + Images | ✅ Oui (60 req/min) |

#### Limites Gratuites

- 60 requêtes par minute
- 1 500 requêtes par jour
- 1 million de tokens par minute

#### Démarrage

```bash
npm run build
npm start
```

---

## 4. Ollama (Local)

### Avantages
- ✅ **100% Gratuit**
- ✅ **Complètement privé** (aucune donnée envoyée)
- ✅ Pas de limite de requêtes
- ✅ Fonctionne hors ligne
- ✅ Personnalisable

### Inconvénients
- ❌ Nécessite un serveur puissant (GPU recommandé)
- ❌ Performances inférieures aux APIs cloud
- ❌ Installation plus complexe

### Prérequis Matériels

| Modèle | RAM Minimum | GPU Recommandé |
|--------|-------------|----------------|
| Llama 2 (7B) | 8 GB | 6 GB VRAM |
| Mistral (7B) | 8 GB | 6 GB VRAM |
| Llama 3 (8B) | 16 GB | 8 GB VRAM |
| Mixtral (47B) | 32 GB | 24 GB VRAM |

### Configuration

#### Étape 1 : Installer Ollama

```bash
# Installation Ollama sur Debian 12
curl -fsSL https://ollama.ai/install.sh | sh

# Vérifier l'installation
ollama --version
```

#### Étape 2 : Télécharger un Modèle

```bash
# Modèle recommandé pour débuter (7B - léger)
ollama pull llama2

# Autres modèles populaires
ollama pull mistral        # Mistral 7B (rapide)
ollama pull llama3         # Llama 3 (performant)
ollama pull codellama      # Spécialisé code
ollama pull phi            # Très léger (2.7B)

# Lister les modèles installés
ollama list
```

#### Étape 3 : Démarrer Ollama

```bash
# Démarrer le serveur Ollama
ollama serve

# Ou avec systemd (recommandé)
sudo systemctl start ollama
sudo systemctl enable ollama

# Vérifier que c'est en cours
curl http://localhost:11434
```

#### Étape 4 : Configuration du Bot

```bash
nano .env
```

Contenu :
```bash
# Azure Bot Service
BOT_ID=votre-microsoft-app-id
BOT_PASSWORD=votre-client-secret

# Choisir Ollama
AI_PROVIDER=ollama

# Configuration Ollama
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama2
OLLAMA_TEMPERATURE=0.7
OLLAMA_NUM_CTX=4096
```

#### Modèles Recommandés

| Modèle | Taille | Description | Commande |
|--------|--------|-------------|----------|
| **llama2** | 7B | Équilibré, bon départ | `ollama pull llama2` |
| **mistral** | 7B | Rapide, performant | `ollama pull mistral` |
| **llama3** | 8B | Dernière génération | `ollama pull llama3` |
| **phi** | 2.7B | Très léger | `ollama pull phi` |
| **codellama** | 7B | Pour le code | `ollama pull codellama` |

#### Ollama sur un Serveur Distant

Si Ollama tourne sur un autre serveur :

```bash
# Dans .env
OLLAMA_HOST=http://192.168.1.100:11434
OLLAMA_MODEL=llama2
```

#### Démarrage

```bash
npm run build
npm start
```

---

## Configuration du Bot

### Structure du Fichier .env

```bash
# ============================================
# Identifiants Azure Bot (obligatoire)
# ============================================
BOT_ID=votre-microsoft-app-id
BOT_PASSWORD=votre-client-secret
PORT=3978

# ============================================
# Choix du Provider
# ============================================
AI_PROVIDER=openai
# Valeurs possibles: openai, anthropic, google, ollama

# ============================================
# Configurations par Provider
# ============================================

# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=2000

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-3-sonnet-20240229
ANTHROPIC_TEMPERATURE=0.7
ANTHROPIC_MAX_TOKENS=2000

# Google
GOOGLE_API_KEY=...
GOOGLE_MODEL=gemini-pro
GOOGLE_TEMPERATURE=0.7
GOOGLE_MAX_TOKENS=2000

# Ollama
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama2
OLLAMA_TEMPERATURE=0.7
OLLAMA_NUM_CTX=4096
```

### Changer de Provider

Pour changer de provider, il suffit de modifier `AI_PROVIDER` :

```bash
# Utiliser OpenAI
AI_PROVIDER=openai

# Utiliser Anthropic
AI_PROVIDER=anthropic

# Utiliser Google
AI_PROVIDER=google

# Utiliser Ollama
AI_PROVIDER=ollama
```

Puis redémarrer le bot :
```bash
npm run build
pm2 restart chatgpt-teams-bot
```

---

## Comparaison des Providers

### Tableau Comparatif

| Critère | OpenAI | Anthropic | Google | Ollama |
|---------|--------|-----------|--------|--------|
| **Prix** | 💰 Payant | 💰 Payant | 🆓 Gratuit* | 🆓 Gratuit |
| **Performance** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Confidentialité** | ❌ Cloud | ❌ Cloud | ❌ Cloud | ✅ Local |
| **Latence** | ~2s | ~2s | ~1.5s | ~1-10s |
| **Contexte Max** | 16k-128k | 200k | 32k | 4k-32k |
| **Hors ligne** | ❌ Non | ❌ Non | ❌ Non | ✅ Oui |
| **Limite Requêtes** | Stricte | Moyenne | Généreuse | ♾️ Illimité |
| **Setup** | 🟢 Facile | 🟢 Facile | 🟢 Facile | 🟡 Moyen |

*Gratuit jusqu'à 60 req/min

### Recommandations

#### 🏆 Meilleur Qualité/Prix : **Google Gemini**
- Gratuit jusqu'à 1500 requêtes/jour
- Bonnes performances
- Facile à configurer

#### 🔒 Meilleur Confidentialité : **Ollama**
- 100% local, aucune donnée envoyée
- Gratuit et illimité
- Nécessite du matériel

#### 🚀 Meilleures Performances : **OpenAI GPT-4** ou **Anthropic Claude Opus**
- Modèles les plus avancés
- Coûteux mais excellents résultats

#### ⚡ Meilleur Rapport Vitesse/Coût : **OpenAI GPT-3.5-turbo**
- Rapide et économique
- Largement testé
- Bon compromis

---

## Coûts Estimés

### OpenAI (GPT-3.5-turbo)
- **1000 messages** : ~$0.50 - $1.50
- **10 000 messages** : ~$5 - $15
- **100 000 messages** : ~$50 - $150

### Anthropic (Claude Sonnet)
- **1000 messages** : ~$1.50 - $7.50
- **10 000 messages** : ~$15 - $75
- **100 000 messages** : ~$150 - $750

### Google (Gemini Pro)
- **1000 messages** : 🆓 **Gratuit**
- **10 000 messages** : 🆓 **Gratuit**
- **100 000 messages** : 🆓 **Gratuit** (si dans les limites)

### Ollama
- **∞ messages** : 🆓 **Gratuit** (coût électricité seulement)

---

## Dépannage

### Erreur : "API key invalid"
```bash
# Vérifier que la clé est correcte dans .env
cat .env | grep API_KEY

# Vérifier que le fichier .env est chargé
pm2 logs chatgpt-teams-bot | grep "API"
```

### Erreur : "Rate limit exceeded"
- **OpenAI/Anthropic** : Attendez ou augmentez votre plan
- **Google** : Attendez la prochaine minute (limite : 60/min)
- **Ollama** : Pas de limite

### Ollama : "Connection refused"
```bash
# Vérifier qu'Ollama tourne
sudo systemctl status ollama

# Redémarrer Ollama
sudo systemctl restart ollama

# Tester manuellement
curl http://localhost:11434
```

### Modèle Ollama non trouvé
```bash
# Lister les modèles installés
ollama list

# Télécharger le modèle manquant
ollama pull llama2
```

---

## Migration entre Providers

### De OpenAI vers Anthropic
1. Obtenir une clé API Anthropic
2. Modifier `.env` :
   ```bash
   AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=sk-ant-...
   ```
3. Redémarrer : `pm2 restart chatgpt-teams-bot`

### De Cloud vers Ollama
1. Installer Ollama : `curl -fsSL https://ollama.ai/install.sh | sh`
2. Télécharger un modèle : `ollama pull llama2`
3. Modifier `.env` :
   ```bash
   AI_PROVIDER=ollama
   OLLAMA_HOST=http://localhost:11434
   OLLAMA_MODEL=llama2
   ```
4. Redémarrer : `pm2 restart chatgpt-teams-bot`

---

## Support

Pour des questions ou problèmes :
- 📖 Documentation OpenAI : https://platform.openai.com/docs
- 📖 Documentation Anthropic : https://docs.anthropic.com
- 📖 Documentation Google : https://ai.google.dev/docs
- 📖 Documentation Ollama : https://ollama.ai/docs

---

## Conclusion

Le bot supporte maintenant 4 providers d'IA différents ! Choisissez celui qui correspond le mieux à vos besoins :

- **Débutant + Budget limité** → Google Gemini
- **Production + Qualité** → OpenAI ou Anthropic
- **Confidentialité + Serveur local** → Ollama
- **Tests/Développement** → Google Gemini (gratuit)

Bonne utilisation ! 🚀
