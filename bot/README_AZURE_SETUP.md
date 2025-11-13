# 🔐 Guide de Configuration Azure AD pour ChatGPT Teams Bot

Ce guide vous accompagne dans la configuration complète de votre bot Microsoft Teams avec Azure AD (Microsoft Entra).

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Étape 1: Créer une application dans Azure AD](#étape-1-créer-une-application-dans-azure-ad)
3. [Étape 2: Configurer l'authentification](#étape-2-configurer-lauthentification)
4. [Étape 3: Créer un secret client](#étape-3-créer-un-secret-client)
5. [Étape 4: Configurer les permissions API](#étape-4-configurer-les-permissions-api)
6. [Étape 5: Configurer votre bot](#étape-5-configurer-votre-bot)
7. [Étape 6: Tester votre bot](#étape-6-tester-votre-bot)
8. [Dépannage](#dépannage)

---

## ✅ Prérequis

- Un compte Microsoft 365 avec accès administrateur
- Node.js 18+ installé
- Accès au portail Azure AD (https://entra.microsoft.com)

---

## 🚀 Étape 1: Créer une application dans Azure AD

### 1.1 Accéder au portail Azure AD

1. Allez sur **https://entra.microsoft.com**
2. Connectez-vous avec votre compte administrateur Microsoft 365

### 1.2 Créer une nouvelle inscription d'application

1. Dans le menu de gauche, cliquez sur **"Applications"** → **"Inscriptions d'applications"**
2. Cliquez sur **"+ Nouvelle inscription"**
3. Remplissez le formulaire:
   - **Nom**: `ChatGPT Teams Bot` (ou le nom de votre choix)
   - **Types de comptes pris en charge**:
     - Choisissez **"Comptes dans cet annuaire organisationnel uniquement"** (single tenant)
     - OU **"Comptes dans n'importe quel annuaire organisationnel"** (multi-tenant)
   - **URI de redirection**: Laissez vide pour l'instant
4. Cliquez sur **"Inscrire"**

### 1.3 Noter vos identifiants

Une fois l'application créée, vous verrez la page **"Vue d'ensemble"**. Notez ces informations importantes:

```
📝 Application (client) ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
📝 Directory (tenant) ID:   xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

> ⚠️ **Important**: Gardez ces identifiants en lieu sûr, vous en aurez besoin pour configurer votre bot.

---

## 🔑 Étape 2: Configurer l'authentification

### 2.1 Ajouter une URI de redirection

1. Dans votre application, cliquez sur **"Authentification"** dans le menu de gauche
2. Cliquez sur **"+ Ajouter une plateforme"**
3. Sélectionnez **"Web"**
4. Ajoutez les URI de redirection:
   - Pour le développement local: `https://localhost:3978/api/messages`
   - Pour la production: `https://votre-domaine.com/api/messages`
5. Cochez **"Jetons d'ID"** sous "Octroi implicite et flux hybrides"
6. Cliquez sur **"Configurer"**

### 2.2 Configurer les types de comptes

1. Vérifiez que le type de compte correspond à vos besoins:
   - **Single tenant**: Uniquement les utilisateurs de votre organisation
   - **Multi-tenant**: Utilisateurs de n'importe quelle organisation Microsoft 365

---

## 🔐 Étape 3: Créer un secret client

### 3.1 Générer un nouveau secret

1. Dans votre application, cliquez sur **"Certificats et secrets"** dans le menu de gauche
2. Sous l'onglet **"Secrets client"**, cliquez sur **"+ Nouveau secret client"**
3. Remplissez:
   - **Description**: `ChatGPT Teams Bot Secret`
   - **Expire**: Choisissez une durée (recommandé: 24 mois)
4. Cliquez sur **"Ajouter"**

### 3.2 Copier le secret

> ⚠️ **CRITIQUE**: Copiez immédiatement la valeur du secret (colonne "Valeur"). Vous ne pourrez plus la voir après avoir quitté cette page!

```
📝 Client Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔓 Étape 4: Configurer les permissions API

### 4.1 Ajouter les permissions Microsoft Graph

1. Cliquez sur **"Autorisations de l'API"** dans le menu de gauche
2. Cliquez sur **"+ Ajouter une autorisation"**
3. Sélectionnez **"Microsoft Graph"**
4. Choisissez **"Autorisations déléguées"**
5. Ajoutez ces permissions:
   - `User.Read` (lecture du profil utilisateur)
   - `Chat.Read` (lecture des conversations - optionnel)
   - `Chat.ReadWrite` (écriture dans les conversations - optionnel)
6. Cliquez sur **"Ajouter les autorisations"**

### 4.2 Accorder le consentement administrateur

1. Cliquez sur le bouton **"Accorder le consentement de l'administrateur pour [votre organisation]"**
2. Confirmez en cliquant sur **"Oui"**

---

## ⚙️ Étape 5: Configurer votre bot

### 5.1 Créer le fichier .env

1. Naviguez vers le répertoire `bot/` de votre projet
2. Copiez le fichier `.env.example` en `.env`:

```bash
cp .env.example .env
```

### 5.2 Remplir les variables d'environnement

Ouvrez le fichier `.env` et remplissez avec vos identifiants Azure AD:

```bash
# Configuration Azure AD
MICROSOFT_APP_ID=votre-application-client-id
MICROSOFT_APP_PASSWORD=votre-client-secret
MICROSOFT_APP_TENANT_ID=votre-directory-tenant-id

# Port du serveur
PORT=3978

# Configuration AI Provider (choisir: openai, anthropic, google, ollama)
AI_PROVIDER=openai

# Configuration OpenAI (exemple)
OPENAI_API_KEY=sk-votre-cle-api-openai
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=2000
```

### 5.3 Installer les dépendances

```bash
cd bot
npm install
```

### 5.4 Compiler le projet

```bash
npm run build
```

---

## 🧪 Étape 6: Tester votre bot

### 6.1 Démarrer le bot en mode développement

```bash
npm run dev
```

Vous devriez voir:

```
🤖 ============================================
   ChatGPT Teams Bot - Démarré avec succès!
   ============================================
   📡 Port: 3978
   🧠 AI Provider: openai
   🔐 App ID: 12345678...
   ============================================

   ✅ Le bot est prêt à recevoir des messages sur:
      http://localhost:3978/api/messages
```

### 6.2 Tester avec Bot Framework Emulator

1. Téléchargez **Bot Framework Emulator**: https://github.com/Microsoft/BotFramework-Emulator/releases
2. Ouvrez l'émulateur
3. Cliquez sur **"Open Bot"**
4. Configurez:
   - **Bot URL**: `http://localhost:3978/api/messages`
   - **Microsoft App ID**: Votre `MICROSOFT_APP_ID`
   - **Microsoft App password**: Votre `MICROSOFT_APP_PASSWORD`
5. Cliquez sur **"Connect"**
6. Envoyez un message pour tester!

### 6.3 Déployer sur Azure (Optionnel)

Pour déployer votre bot sur Azure:

```bash
# 1. Créer un Azure Bot Service
az bot create --resource-group myResourceGroup --name myChatGPTBot --kind webapp --location westeurope

# 2. Configurer les variables d'environnement dans Azure
az webapp config appsettings set --resource-group myResourceGroup --name myChatGPTBot --settings \
  MICROSOFT_APP_ID=votre-app-id \
  MICROSOFT_APP_PASSWORD=votre-secret \
  AI_PROVIDER=openai \
  OPENAI_API_KEY=votre-openai-key

# 3. Déployer le code
npm run build
az webapp deployment source config-zip --resource-group myResourceGroup --name myChatGPTBot --src ./deploy.zip
```

---

## 🔧 Dépannage

### Problème: "ERREUR: Les identifiants Azure AD sont requis"

**Solution**: Vérifiez que votre fichier `.env` contient bien:
```bash
MICROSOFT_APP_ID=...
MICROSOFT_APP_PASSWORD=...
```

### Problème: "Unauthorized" lors de la connexion

**Solutions**:
1. Vérifiez que le **Client Secret** est correct et n'a pas expiré
2. Assurez-vous que l'**App ID** correspond exactement à celui du portail Azure
3. Vérifiez que les permissions API ont été accordées par un administrateur

### Problème: Le bot ne répond pas

**Solutions**:
1. Vérifiez que le provider AI est correctement configuré (clé API valide)
2. Consultez les logs du serveur pour voir les erreurs
3. Testez la route de santé: `http://localhost:3978/health`

### Problème: "Cannot find module 'dotenv'"

**Solution**: Installez les dépendances:
```bash
npm install
```

### Problème: Erreur de compilation TypeScript

**Solution**: Vérifiez la version de Node.js (18+) et recompilez:
```bash
npm run build
```

---

## 📚 Ressources utiles

- [Documentation Azure AD](https://learn.microsoft.com/azure/active-directory/)
- [Bot Framework Documentation](https://docs.microsoft.com/azure/bot-service/)
- [Microsoft Teams Developer Docs](https://learn.microsoft.com/microsoftteams/platform/)
- [Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator)

---

## 🆘 Besoin d'aide?

Si vous rencontrez des problèmes:

1. Consultez la section [Dépannage](#dépannage) ci-dessus
2. Vérifiez les logs du serveur
3. Testez avec le Bot Framework Emulator
4. Consultez la documentation Microsoft officielle

---

## ✅ Checklist de configuration

Utilisez cette checklist pour vérifier que tout est configuré:

- [ ] Application créée dans Azure AD (entra.microsoft.com)
- [ ] Application (client) ID noté
- [ ] Directory (tenant) ID noté
- [ ] URI de redirection configurée
- [ ] Secret client créé et noté
- [ ] Permissions API configurées
- [ ] Consentement administrateur accordé
- [ ] Fichier .env créé et configuré
- [ ] Dépendances installées (`npm install`)
- [ ] Projet compilé (`npm run build`)
- [ ] Bot démarré avec succès (`npm run dev`)
- [ ] Test avec Bot Framework Emulator réussi

---

**🎉 Félicitations!** Votre ChatGPT Teams Bot est maintenant configuré et prêt à être utilisé!
