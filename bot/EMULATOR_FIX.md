# 🔧 Fix Bot Framework Emulator - ECONNREFUSED

## Problème
```
❌ [onTurnError] Erreur non gérée: RestError: connect ECONNREFUSED 127.0.0.1:28110
```

## Cause
Le bot fonctionne en mode développement, mais ne peut pas communiquer avec l'émulateur à cause d'un conflit IPv4/IPv6.

---

## ✅ Solution 1 : Connexion directe sans fichier .bot

**Dans Bot Framework Emulator :**

1. **Fermez** l'émulateur complètement
2. **Relancez** l'émulateur
3. **NE PAS** utiliser "Open Bot"
4. À la place, cliquez sur **"Open Bot"** puis **ANNULEZ**
5. Dans le champ "Enter your endpoint URL", tapez :
   ```
   http://localhost:3978/api/messages
   ```
6. **IMPORTANT** : Laissez les champs vides :
   - Microsoft App ID : **(VIDE)**
   - Microsoft App password : **(VIDE)**
7. Cliquez sur **Connect**

---

## ✅ Solution 2 : Activer "Bypass ngrok"

**Dans Bot Framework Emulator :**

1. Allez dans **Settings** (⚙️ en bas à gauche)
2. Trouvez l'option **"Bypass ngrok for local addresses"**
3. **COCHEZ** cette option
4. Redémarrez l'émulateur
5. Reconnectez-vous à `http://localhost:3978/api/messages` (sans App ID/Password)

---

## ✅ Solution 3 : Configuration réseau (si les solutions 1 et 2 échouent)

**Forcer IPv4 dans le bot :**

Modifiez `bot/index.ts` ligne 91 :

```typescript
// Remplacez :
server.listen(process.env.port || process.env.PORT || 3978, () => {

// Par :
server.listen(process.env.port || process.env.PORT || 3978, '127.0.0.1', () => {
```

Puis redémarrez :
```bash
npm run dev
```

---

## ✅ Solution 4 : Vérifier les ports utilisés

**Vérifiez qu'aucun autre processus n'utilise le port 28110 :**

```bash
lsof -i :28110
# ou
netstat -tulpn | grep 28110
```

Si un processus utilise ce port, tuez-le :
```bash
kill -9 <PID>
```

---

## ✅ Solution 5 : Désactiver le pare-feu (temporairement)

**Sur WSL2/Linux :**
```bash
sudo ufw allow 28110
sudo ufw allow 3978
```

**Sur Windows :**
- Ouvrez "Pare-feu Windows Defender"
- Autorisez "Bot Framework Emulator" dans les applications

---

## 🧪 Test rapide

Une fois l'émulateur connecté :

1. Tapez **"test"** dans l'émulateur
2. Le bot devrait répondre sans erreur ECONNREFUSED
3. Vérifiez dans le terminal du bot qu'il traite le message

---

## 📝 Configuration actuelle

Votre bot est en **mode développement** :
- ✅ Pas d'authentification Azure AD
- ✅ Port : 3978
- ✅ Provider : Google Gemini

L'émulateur doit correspondre :
- ✅ Endpoint : `http://localhost:3978/api/messages`
- ✅ App ID : **(VIDE)**
- ✅ App Password : **(VIDE)**

---

## 🆘 Si rien ne fonctionne

Utilisez **ngrok** comme proxy :

```bash
# Installez ngrok
npm install -g ngrok

# Lancez ngrok
ngrok http 3978
```

Copiez l'URL HTTPS (ex: `https://abc123.ngrok.io`) et dans l'émulateur, connectez-vous à :
```
https://abc123.ngrok.io/api/messages
```

Toujours sans App ID/Password !
