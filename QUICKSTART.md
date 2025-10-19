# 🚀 Quick Start Guide

## For Complete Beginners - Step by Step

### What You're Building
A website that lets you create custom forms and manage data (like Google Sheets but better!).

---

## ⚡ 5-Minute Setup

### Step 1: Open PowerShell
1. Press `Windows + X`
2. Click "Windows PowerShell"

### Step 2: Go to Your Project Folder
```powershell
cd c:\Users\jake6\Desktop\automation
```

### Step 3: Set Up Firebase

#### 3a. Create Firebase Account
1. Visit: https://console.firebase.google.com/
2. Click "Add project"
3. Name it: "my-workflow-app"
4. Click through the setup (disable Analytics if asked)

#### 3b. Enable Authentication
1. Click "Authentication" in sidebar
2. Click "Get started"
3. Click "Email/Password" → Turn ON → Save
4. Click "Google" → Turn ON → Save

#### 3c. Create Database
1. Click "Firestore Database" in sidebar
2. Click "Create database"
3. Select "Start in test mode"
4. Choose your location
5. Click "Enable"

#### 3d. Get Your Keys
1. Click the gear icon → "Project settings"
2. Scroll to "Your apps"
3. Click the web icon `</>`
4. Name it "my-app"
5. **COPY THE CONFIG** - you'll need it next!

### Step 4: Configure Your App

1. In PowerShell, create your environment file:
```powershell
copy .env.example .env.local
```

2. Open `.env.local` in Notepad:
```powershell
notepad .env.local
```

3. Replace with YOUR Firebase values:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIza... (paste YOUR key)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=my-workflow-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=my-workflow-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=my-workflow-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

4. Get Firebase Admin Key:
   - In Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
   - Open it and copy the `client_email` and `private_key`
   - Paste into `.env.local`:
   ```
   FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk...@my-workflow-app.iam.gserviceaccount.com
   FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour key here...\n-----END PRIVATE KEY-----\n"
   ```

5. Save and close Notepad

### Step 5: Start the App

```powershell
npm run dev
```

**Wait for**: `✓ Ready in 2.3s`

### Step 6: Open Your Browser

1. Open Chrome/Edge
2. Go to: http://localhost:3000
3. Click "Get Started"
4. Create your account!

---

## 🎉 You're Done! Now What?

### Create Your First Workflow

1. Click "New Workflow"
2. Name it: "Customer Form"
3. Add fields:
   - Full Name (Text)
   - Email (Email)
   - Phone (Text)
4. Click "Create Workflow"

### Add Records

1. Go to your workflow
2. Click "Add Record"
3. Fill in the form
4. Save!

---

## 🆘 Common Issues

### "npm is not recognized"
- You need to install Node.js: https://nodejs.org/
- Download the LTS version and install
- Restart PowerShell

### "Cannot find module"
```powershell
npm install
```

### "Port 3000 is in use"
```powershell
npm run dev -- -p 3001
```
Then visit: http://localhost:3001

### Firebase Errors
- Double-check all values in `.env.local`
- Make sure there are no extra spaces
- Private key should have `\n` (that's correct!)

---

## 📱 What's Next?

1. **Explore the Dashboard** - Click around!
2. **Check Analytics** - See your data visualized
3. **Try Integrations** - Connect to Zapier
4. **Invite Users** - Share your app!

---

## 🎓 Understanding the Code

### What Each Folder Does

- `app/` - All your web pages
- `components/` - Reusable parts (like LEGO blocks)
- `lib/` - Helper code (Firebase connection)
- `types/` - TypeScript definitions (data shapes)

### Key Files

- `app/page.tsx` - Homepage (what visitors see)
- `app/dashboard/page.tsx` - Main dashboard
- `app/login/page.tsx` - Login page
- `contexts/AuthContext.tsx` - Manages user login

---

## 🌐 Putting It Online (Deploy)

### Using Vercel (Easiest)

1. Go to: https://vercel.com/
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Connect your project folder
5. Add all your environment variables (from `.env.local`)
6. Click "Deploy"
7. Done! Your app is live!

### Update Firebase

After deployment:
1. Go to Firebase Console
2. Authentication → Settings → Authorized domains
3. Add your Vercel URL (e.g., `my-app.vercel.app`)

---

## 💡 Pro Tips

1. **Keep `.env.local` secret** - Never share it!
2. **Test locally first** - Before deploying
3. **Use test mode** - For Firestore initially
4. **Check console** - Press F12 in browser for errors

---

**Questions?** Check the main README.md file for detailed docs!

**Happy Building! 🚀**
