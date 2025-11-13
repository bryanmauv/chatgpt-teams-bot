# 🤖 ChatGPT Teams Bot - Multi-Provider Edition

Bot Microsoft Teams avec support de **4 fournisseurs d'IA** :
- 🟢 **OpenAI** (ChatGPT - GPT-3.5, GPT-4)
- 🔵 **Anthropic** (Claude 3 - Opus, Sonnet, Haiku)
- 🔴 **Google** (Gemini Pro)
- 🟣 **Ollama** (Modèles locaux - Llama, Mistral, etc.)

---

## ✨ Nouveautés

### ✅ Multi-Providers IA
Choisissez le fournisseur qui vous convient :
- **OpenAI** : Performances éprouvées
- **Anthropic** : Excellent raisonnement
- **Google** : **Gratuit** jusqu'à 60 req/min
- **Ollama** : **100% local et privé**

### ✅ Correction du Bug de Conversation
- **Ancien comportement** : Toutes les conversations étaient mélangées
- **Nouveau comportement** : Chaque utilisateur a sa propre conversation isolée

### ✅ Gestion d'Erreurs Améliorée
- Try-catch autour des appels API
- Messages d'erreur conviviaux
- Validation des entrées utilisateur

### ✅ Indicateur de Frappe
Le bot affiche maintenant "en train d'écrire..." pendant le traitement

---

## 🚀 Installation Rapide

### 1. Prérequis
```bash
# Node.js 18+
node --version

# Cloner le projet
git clone https://github.com/formulahendry/chatgpt-teams-bot.git
cd chatgpt-teams-bot/bot
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Choisir un Provider

#### Option A : OpenAI (Payant)
```bash
# Créer .env
cat > .env << EOF
BOT_ID=votre-app-id
BOT_PASSWORD=votre-secret
AI_PROVIDER=openai
OPENAI_API_KEY=sk-votre-cle-ici
OPENAI_MODEL=gpt-3.5-turbo
EOF
```

#### Option B : Google Gemini (Gratuit)
```bash
# Créer .env
cat > .env << EOF
BOT_ID=votre-app-id
BOT_PASSWORD=votre-secret
AI_PROVIDER=google
GOOGLE_API_KEY=votre-cle-google
GOOGLE_MODEL=gemini-pro
EOF
```

#### Option C : Anthropic (Payant)
```bash
# Créer .env
cat > .env << EOF
BOT_ID=votre-app-id
BOT_PASSWORD=votre-secret
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-votre-cle-ici
ANTHROPIC_MODEL=claude-3-sonnet-20240229
EOF
```

#### Option D : Ollama (Local, Gratuit)
```bash
# Installer Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Télécharger un modèle
ollama pull llama2

# Démarrer Ollama
ollama serve

# Créer .env
cat > .env << EOF
BOT_ID=votre-app-id
BOT_PASSWORD=votre-secret
AI_PROVIDER=ollama
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama2
EOF
```

### 4. Démarrer le Bot
```bash
# Compiler
npm run build

# Lancer
npm start
```

---

## 📖 Documentation Complète

Pour un guide d'installation détaillé sur Debian 12, consultez :
- 📘 **[MULTI_AI_SETUP.md](../MULTI_AI_SETUP.md)** - Guide complet avec tous les providers

---

## 🔧 Configuration

### Variables d'Environnement

Voir le fichier [.env.example](./.env.example) pour toutes les options disponibles.

### Changer de Provider

Pour basculer entre providers, modifiez simplement `AI_PROVIDER` dans `.env` :

```bash
# OpenAI
AI_PROVIDER=openai

# Anthropic
AI_PROVIDER=anthropic

# Google
AI_PROVIDER=google

# Ollama
AI_PROVIDER=ollama
```

Puis redémarrez le bot.

---

## 🏗️ Architecture

```
bot/
├── providers/               # Providers d'IA
│   ├── base.ts             # Interface commune
│   ├── openai.ts           # Provider OpenAI
│   ├── anthropic.ts        # Provider Anthropic
│   ├── google.ts           # Provider Google
│   ├── ollama.ts           # Provider Ollama
│   ├── factory.ts          # Factory pour créer les providers
│   └── index.ts            # Exports
├── config.ts               # Configuration centralisée
├── teamsBot.ts            # Logique du bot Teams
└── index.ts               # Point d'entrée
```

### Principe de Fonctionnement

1. Le bot reçoit un message de Teams
2. Il crée un ID de conversation unique par utilisateur
3. Il envoie le message au provider configuré
4. Le provider maintient l'historique de conversation
5. La réponse est renvoyée à l'utilisateur dans Teams

---

## 📊 Comparaison des Providers

| Provider | Prix | Performance | Confidentialité | Latence |
|----------|------|-------------|-----------------|---------|
| **OpenAI** | 💰 $0.50/1M tokens | ⭐⭐⭐⭐⭐ | ❌ Cloud | ~2s |
| **Anthropic** | 💰 $3/1M tokens | ⭐⭐⭐⭐⭐ | ❌ Cloud | ~2s |
| **Google** | 🆓 Gratuit* | ⭐⭐⭐⭐ | ❌ Cloud | ~1.5s |
| **Ollama** | 🆓 Gratuit | ⭐⭐⭐ | ✅ Local | ~1-10s |

*Google : Gratuit jusqu'à 60 requêtes/minute

---

## 🛡️ Sécurité

### Améliorations de Sécurité

✅ **Conversations Isolées** : Chaque utilisateur a sa propre conversation
✅ **Validation des Entrées** : Vérification de la longueur et du contenu
✅ **Gestion d'Erreurs** : Pas de détails sensibles exposés
✅ **Rate Limiting** : Prévention des abus (TODO)
✅ **Variables d'Environnement** : Clés API sécurisées

### Recommandations

- 🔒 Ne jamais committer le fichier `.env`
- 🔒 Utiliser Azure Key Vault en production
- 🔒 Configurer des alertes de coût pour les APIs
- 🔒 Implémenter un rate limiting par utilisateur
- 🔒 Pour la confidentialité maximale, utilisez Ollama

---

## 🔄 Migration

### Depuis l'Ancienne Version

Si vous utilisez l'ancienne version avec `chatgpt` npm package :

1. **Sauvegarder** votre `.env` actuel
2. **Mettre à jour** les dépendances : `npm install`
3. **Créer** un nouveau `.env` avec le nouveau format
4. **Rebuild** : `npm run build`
5. **Redémarrer** : `npm start`

### Migration des Données

Les conversations ne sont pas persistées entre redémarrages. Pour implémenter la persistance :
- Utilisez Redis ou une base de données
- Modifiez `base.ts` pour sauvegarder/charger les conversations

---

## 🐛 Dépannage

### Le bot ne répond pas
```bash
# Vérifier les logs
pm2 logs chatgpt-teams-bot

# Vérifier que le provider est bien configuré
cat .env | grep AI_PROVIDER
```

### Erreur "API key invalid"
```bash
# Vérifier la clé API
cat .env | grep API_KEY

# Tester la clé manuellement
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

### Ollama ne se connecte pas
```bash
# Vérifier qu'Ollama tourne
sudo systemctl status ollama

# Tester manuellement
curl http://localhost:11434

# Vérifier que le modèle est téléchargé
ollama list
```

---

## 📝 Exemples d'Utilisation

### Conversation Simple
```
Utilisateur: Bonjour!
Bot: Bonjour ! Comment puis-je vous aider aujourd'hui ?

Utilisateur: Quel temps fait-il à Paris ?
Bot: Je suis un assistant IA et je n'ai pas accès aux données en temps réel...
```

### Conversation avec Contexte
```
Utilisateur: Je m'appelle Jean
Bot: Enchanté Jean ! Comment puis-je vous aider ?

Utilisateur: Quel est mon prénom ?
Bot: Votre prénom est Jean !
```

Chaque conversation conserve son contexte indépendamment des autres utilisateurs.

---

## 🤝 Contribution

Les contributions sont les bienvenues !

### Ajouter un Nouveau Provider

1. Créer un fichier dans `providers/` (ex: `providers/cohere.ts`)
2. Implémenter `BaseAIProvider`
3. Ajouter la configuration dans `config.ts`
4. Mettre à jour `factory.ts`
5. Documenter dans `MULTI_AI_SETUP.md`

---

## 📄 Licence

MIT License - Voir le fichier LICENSE

---

## 🙏 Remerciements

- Projet original : [formulahendry/chatgpt-teams-bot](https://github.com/formulahendry/chatgpt-teams-bot)
- OpenAI pour l'API ChatGPT
- Anthropic pour l'API Claude
- Google pour Gemini
- Ollama pour les modèles locaux

---

## 📞 Support

Pour des questions spécifiques :
- 📖 [Documentation OpenAI](https://platform.openai.com/docs)
- 📖 [Documentation Anthropic](https://docs.anthropic.com)
- 📖 [Documentation Google AI](https://ai.google.dev/docs)
- 📖 [Documentation Ollama](https://ollama.ai/docs)

---

**Bon développement ! 🚀**
