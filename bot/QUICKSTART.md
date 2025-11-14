# 🚀 Guide de démarrage rapide - 5 minutes

Ce guide vous permet de tester votre bot localement en **moins de 5 minutes**.

## ✅ Étape 1: Configuration (2 min)

### 1.1 Créer le fichier .env

```bash
cp .env.example .env
```

### 1.2 Configurer le minimum requis

Éditez `.env` et configurez:

```bash
# Azure AD (obtenez ces valeurs sur https://entra.microsoft.com)
MICROSOFT_APP_ID=votre-app-id-azure
MICROSOFT_APP_PASSWORD=votre-secret-client
MICROSOFT_APP_TENANT_ID=votre-tenant-id

# Provider IA (choisissez-en UN)
AI_PROVIDER=openai  # ou: google, anthropic, ollama

# Configuration du provider choisi
OPENAI_API_KEY=sk-votre-cle-openai  # si AI_PROVIDER=openai
# OU
GOOGLE_API_KEY=votre-cle-google      # si AI_PROVIDER=google
# OU
ANTHROPIC_API_KEY=sk-ant-votre-cle   # si AI_PROVIDER=anthropic
# OU (Ollama doit être installé et en cours d'exécution)
OLLAMA_HOST=http://localhost:11434   # si AI_PROVIDER=ollama
```

**Aide rapide pour obtenir les clés:**

- **Azure AD**: [bot/README_AZURE_SETUP.md](./README_AZURE_SETUP.md) (guide complet)
- **OpenAI**: https://platform.openai.com/api-keys
- **Google**: https://makersuite.google.com/app/apikey (gratuit!)
- **Anthropic**: https://console.anthropic.com/
- **Ollama**: https://ollama.ai/ (local, gratuit)

---

## 🏃 Étape 2: Démarrer le bot (1 min)

```bash
# Compiler et démarrer
npm run build
npm start

# OU en mode développement (avec hot-reload)
npm run dev
```

Vous devriez voir:

```
🤖 ============================================
   ChatGPT Teams Bot - Démarré avec succès!
   ============================================
   📡 Port: 3978
   🧠 AI Provider: openai
   🔐 App ID: fa5d0a69...
   ============================================

   ✅ Le bot est prêt à recevoir des messages sur:
      http://localhost:3978/api/messages
```

---

## 🧪 Étape 3: Tester avec Bot Framework Emulator (2 min)

### 3.1 Télécharger l'émulateur

Téléchargez le **Bot Framework Emulator**:
- 🔗 https://github.com/Microsoft/BotFramework-Emulator/releases
- Choisissez la version pour votre OS (Windows, macOS, Linux)

### 3.2 Configurer la connexion

1. **Ouvrez Bot Framework Emulator**
2. Cliquez sur **"Open Bot"**
3. Remplissez le formulaire:

   ```
   Bot URL: http://localhost:3978/api/messages

   Microsoft App ID: votre-MICROSOFT_APP_ID
   Microsoft App password: votre-MICROSOFT_APP_PASSWORD

   (Laissez les autres champs vides)
   ```

4. Cliquez sur **"Connect"**

### 3.3 Envoyer un message test

Dans l'émulateur, envoyez un message:

```
Bonjour! Peux-tu te présenter?
```

Le bot devrait répondre avec votre provider IA configuré (OpenAI, Google, etc.)!

---

## 🎯 Étape 4: Vérifier que tout fonctionne

### ✅ Checklist de validation

- [ ] Le bot démarre sans erreur
- [ ] L'émulateur se connecte avec succès
- [ ] Le bot reçoit les messages (visible dans les logs)
- [ ] Le bot répond avec l'IA configurée
- [ ] Les réponses sont cohérentes et correctes

### 📊 Test de santé

Testez la route de santé du bot:

```bash
curl http://localhost:3978/health
```

Réponse attendue:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-14T...",
  "aiProvider": "openai",
  "version": "2.0.0"
}
```

---

## 🐛 Problèmes courants

### Le bot ne démarre pas

**Erreur**: `❌ ERREUR: Les identifiants Azure AD sont requis!`

**Solution**:
- Vérifiez que `.env` existe et contient `MICROSOFT_APP_ID` et `MICROSOFT_APP_PASSWORD`
- Vérifiez qu'il n'y a pas d'espaces ou de guillemets autour des valeurs

---

### L'émulateur ne se connecte pas

**Erreur**: `Unauthorized` ou `403 Forbidden`

**Solutions**:
1. Vérifiez que l'App ID et le Secret sont corrects
2. Copiez-collez directement depuis Azure AD
3. Vérifiez que le secret n'a pas expiré
4. Recréez un nouveau secret si nécessaire

---

### Le bot ne répond pas

**Erreur**: Le bot reçoit le message mais ne répond pas

**Solutions**:
1. Vérifiez la clé API du provider IA:
   - **OpenAI**: Vérifiez que vous avez des crédits
   - **Google**: Vérifiez que l'API est activée
   - **Ollama**: Vérifiez que `ollama serve` est en cours d'exécution
2. Consultez les logs du serveur pour voir les erreurs
3. Testez la clé API manuellement:
   ```bash
   # OpenAI
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer YOUR_API_KEY"
   ```

---

### Erreur "crypto is not defined"

**Correction automatique**: Cette erreur devrait être corrigée automatiquement avec le polyfill crypto dans `index.ts`. Si elle persiste:

```bash
# Nettoyez et recompilez
rm -rf lib/ node_modules/
npm install
npm run build
npm start
```

---

## 📚 Prochaines étapes

Une fois que le bot fonctionne localement:

1. **Déployer sur Azure** - [bot/README_AZURE_SETUP.md](./README_AZURE_SETUP.md#option-2-déployer-sur-azure-production)
2. **Installer dans Teams** - [README.md](../README.md#option-3-ajouter-le-bot-à-microsoft-teams)
3. **Changer de provider IA** - Modifiez `AI_PROVIDER` dans `.env`
4. **Personnaliser les réponses** - Éditez `teamsBot.ts`

---

## 🆘 Besoin d'aide?

- **Guide complet Azure AD**: [bot/README_AZURE_SETUP.md](./README_AZURE_SETUP.md)
- **Guide multi-provider IA**: [bot/README_MULTI_AI.md](./README_MULTI_AI.md)
- **Documentation technique**: [bot/README.md](./README.md)
- **README principal**: [../README.md](../README.md)

---

**🎉 Félicitations!** Votre bot ChatGPT Teams fonctionne localement!
