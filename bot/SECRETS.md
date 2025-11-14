# 🔐 Configuration des fichiers secrets

Ce document explique les fichiers de configuration qui contiennent des secrets et qui sont **exclus de git** pour des raisons de sécurité.

## ⚠️ Fichiers ignorés par git

Ces fichiers sont listés dans `.gitignore` et ne doivent **JAMAIS** être commitées:

### 1. `.env` - Configuration actuelle

**Chemin**: `bot/.env`
**Statut**: ❌ Ignoré par git (sécurité)

Contient la configuration active du bot:

```bash
# Identifiants Azure AD
MICROSOFT_APP_ID=votre-app-id
MICROSOFT_APP_PASSWORD=votre-secret-client
MICROSOFT_APP_TENANT_ID=votre-tenant-id

# Clés API des providers IA
GOOGLE_API_KEY=votre-cle-google
OPENAI_API_KEY=votre-cle-openai
ANTHROPIC_API_KEY=votre-cle-anthropic
```

**⚠️ Pourquoi ne pas commiter ce fichier?**
- Expose vos identifiants Azure AD
- Expose vos clés API (Google, OpenAI, Anthropic)
- Risque de vol de compte et d'utilisation frauduleuse
- Violation des règles de sécurité

---

### 2. `.env.backup` - Sauvegarde de configuration

**Chemin**: `bot/.env.backup`
**Statut**: ❌ Ignoré par git (sécurité)

Sauvegarde du fichier `.env` créée automatiquement.

Contient les mêmes secrets que `.env`, donc doit être protégée.

---

### 3. `chatgpt-teams-bot.bot` - Configuration émulateur avec auth

**Chemin**: `bot/chatgpt-teams-bot.bot`
**Statut**: ❌ Ignoré par git (sécurité)

Fichier de configuration pour Bot Framework Emulator avec authentification Azure AD:

```json
{
  "name": "ChatGPT Teams Bot (Production)",
  "services": [
    {
      "type": "endpoint",
      "appId": "votre-app-id",
      "appPassword": "votre-secret-client",
      "endpoint": "http://localhost:3978/api/messages"
    }
  ]
}
```

**⚠️ Pourquoi ne pas commiter ce fichier?**
- Contient votre App Password Azure AD en clair
- Permet à quiconque de se connecter à votre bot
- Risque de sécurité élevé

---

## ✅ Fichiers sûrs (trackés par git)

Ces fichiers sont **sûrs** car ils ne contiennent pas de secrets:

### `chatgpt-teams-bot-dev.bot` - Configuration émulateur sans auth

**Chemin**: `bot/chatgpt-teams-bot-dev.bot`
**Statut**: ✅ Tracké par git (pas de secrets)

Fichier de configuration pour Bot Framework Emulator **sans authentification**:

```json
{
  "name": "ChatGPT Teams Bot (Dev)",
  "services": [
    {
      "type": "endpoint",
      "appId": "",
      "appPassword": "",
      "endpoint": "http://localhost:3978/api/messages"
    }
  ]
}
```

Ce fichier est sûr car les champs `appId` et `appPassword` sont **vides**.

---

### `.env.example` - Template de configuration

**Chemin**: `bot/.env.example`
**Statut**: ✅ Tracké par git (template uniquement)

Template pour créer votre fichier `.env`:

```bash
# Configuration Azure AD (valeurs d'exemple)
MICROSOFT_APP_ID=00000000-0000-0000-0000-000000000000
MICROSOFT_APP_PASSWORD=votre-secret-client

# Clés API (placeholders)
GOOGLE_API_KEY=votre-cle-google-api
OPENAI_API_KEY=sk-votre-cle-openai
```

Ce fichier est sûr car il contient uniquement des **placeholders** et des **valeurs d'exemple**.

---

## 🛡️ Meilleures pratiques de sécurité

### ✅ À FAIRE

1. **Gardez vos secrets locaux uniquement**
   - Les fichiers `.env` doivent rester sur votre machine
   - Ne les partagez jamais par email, Slack, etc.

2. **Utilisez des variables d'environnement en production**
   ```bash
   # Sur Azure
   az webapp config appsettings set \
     --name myBot \
     --settings MICROSOFT_APP_ID="..." MICROSOFT_APP_PASSWORD="..."
   ```

3. **Régénérez vos secrets si exposés**
   - Si vous avez accidentellement commité un secret, régénérez-le immédiatement
   - Allez sur Azure Portal → Votre app → Certificats et secrets → Nouveau secret

4. **Utilisez .gitignore correctement**
   - Vérifiez que `.env`, `.env.backup`, et `*.bot` (avec secrets) sont ignorés
   - Testez avec `git status` avant chaque commit

### ❌ À NE PAS FAIRE

1. ❌ **Ne JAMAIS commiter les fichiers suivants**:
   - `.env`
   - `.env.backup`
   - `chatgpt-teams-bot.bot` (celui avec auth)
   - Tout fichier contenant des secrets

2. ❌ **Ne JAMAIS partager vos secrets**:
   - Sur GitHub, GitLab, Bitbucket
   - Dans des issues publiques
   - Sur des forums ou Stack Overflow
   - Dans des logs ou screenshots

3. ❌ **Ne JAMAIS hardcoder les secrets dans le code**:
   ```typescript
   // ❌ MAUVAIS
   const apiKey = "sk-1234567890abcdef";

   // ✅ BON
   const apiKey = process.env.OPENAI_API_KEY;
   ```

---

## 🔍 Comment vérifier vos fichiers

### Vérifier qu'aucun secret n'est tracké

```bash
# Vérifier le statut git
git status

# Rechercher des secrets potentiels
git grep -i "sk-" || echo "Aucun secret trouvé"
git grep -i "api_key" || echo "Aucune clé trouvée"
```

### Vérifier le .gitignore

```bash
# Afficher le .gitignore
cat bot/.gitignore

# Vérifier qu'un fichier est bien ignoré
git check-ignore bot/.env
# Devrait afficher: bot/.env
```

---

## 📚 Ressources

- [GitHub: Supprimer des données sensibles](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Azure: Meilleures pratiques de sécurité](https://learn.microsoft.com/azure/security/fundamentals/identity-management-best-practices)
- [OWASP: Gestion des secrets](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

---

## 🆘 Si vous avez exposé un secret

Si vous avez accidentellement commité un secret sur GitHub:

### 1. Régénérez immédiatement le secret

**Pour Azure AD:**
1. Allez sur https://portal.azure.com
2. Azure Active Directory → App registrations → Votre app
3. Certificats et secrets → Nouveau secret client
4. Supprimez l'ancien secret

**Pour les clés API:**
- **OpenAI**: https://platform.openai.com/api-keys
- **Google**: https://console.cloud.google.com/apis/credentials
- **Anthropic**: https://console.anthropic.com/settings/keys

### 2. Supprimez le secret de l'historique git

```bash
# Utilisez BFG Repo-Cleaner ou git-filter-repo
git filter-repo --path bot/.env --invert-paths
```

### 3. Forcez le push (ATTENTION: destructif)

```bash
git push origin --force --all
```

---

**⚠️ RAPPEL**: Les secrets doivent toujours rester **privés** et **locaux**. Ne les commitez jamais sur GitHub!
