# 🐛 Troubleshooting Guide

## Common Issues and Solutions

### ❌ "Failed to load workflows"

**Problem**: Firestore queries are failing  
**Causes**:
1. Server not restarted after updating `.env.local`
2. Invalid Firebase Admin credentials
3. Firestore security rules too restrictive

**Solutions**:

#### 1. Restart the Development Server
```powershell
# Press Ctrl+C in terminal
# Then run:
npm run dev
```

#### 2. Check Your .env.local File
Make sure you have:
- ✅ All `NEXT_PUBLIC_FIREBASE_*` variables filled
- ✅ `FIREBASE_ADMIN_PRIVATE_KEY` is the FULL key (1700+ characters)
- ✅ `FIREBASE_ADMIN_CLIENT_EMAIL` matches your Firebase project
- ✅ No extra spaces or missing quotes

#### 3. Update Firestore Security Rules
In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /workflows/{workflowId} {
      allow read, write: if request.auth != null;
    }
    
    match /records/{recordId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Click "Publish" to save.

---

### ❌ "Firebase: Error (auth/invalid-api-key)"

**Problem**: Firebase API key is incorrect  
**Solution**: 
1. Go to Firebase Console → Project Settings
2. Copy the `apiKey` from "Your apps"
3. Paste into `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local`
4. Restart server

---

### ❌ Charts Not Showing

**Problem**: Recharts library rendering issue  
**Solution**: This is normal with empty data. Create a workflow and add records to see charts.

---

### ❌ "Cannot find module" Error

**Problem**: Missing dependencies  
**Solution**:
```powershell
npm install
```

---

### ❌ Port 3000 Already in Use

**Problem**: Another process is using port 3000  
**Solution**:
```powershell
# Use a different port
npm run dev -- -p 3001
```
Then visit: http://localhost:3001

---

### ❌ Google Sign-In Not Working

**Problem**: Google Auth not configured  
**Solution**:
1. Firebase Console → Authentication
2. Click "Google" provider
3. Enable it
4. Add your email as a test user
5. Save

---

### ❌ Page Won't Load / Stuck Loading

**Problem**: Database connection issue or infinite loop  
**Solution**:
1. Check browser console (F12)
2. Look for error messages
3. Check that Firebase credentials are correct
4. Try signing out and back in

---

### ❌ "Permission Denied" Error

**Problem**: Firestore security rules blocking requests  
**Solution**: Update security rules (see "Failed to load workflows" above)

---

## 🔍 How to Debug

### 1. Check Browser Console
- Press `F12` in your browser
- Click "Console" tab
- Look for red error messages
- Read what they say!

### 2. Check Terminal Output
- Look at your PowerShell terminal
- Check for errors after commands
- Red text = errors

### 3. Verify Firebase Setup
- [ ] Project created
- [ ] Authentication enabled (Email + Google)
- [ ] Firestore database created
- [ ] Security rules published
- [ ] Credentials copied correctly

### 4. Test Firebase Connection
Create this test file to verify:

**test-firebase.js**:
```javascript
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'your-project-id',
    clientEmail: 'your-client-email',
    privateKey: 'your-private-key'.replace(/\\n/g, '\n'),
  }),
});

console.log('✅ Firebase connected successfully!');
```

Run: `node test-firebase.js`

---

## 📝 Environment Variables Checklist

Your `.env.local` should look like this:

```env
# Client-side (visible in browser)
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=myproject.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=myproject
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=myproject.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Server-side (secret, never exposed)
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...(VERY LONG)...==\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@myproject.iam.gserviceaccount.com
```

**Important**:
- ✅ Private key should be ~1700 characters
- ✅ Keep the quotes and `\n` characters
- ✅ No extra spaces
- ✅ All values from YOUR Firebase project

---

## 🆘 Still Having Issues?

1. **Read error messages carefully** - they tell you what's wrong
2. **Check all steps in QUICKSTART.md** - did you miss anything?
3. **Try the CHECKLIST.md** - verify each item
4. **Clear browser cache** - Ctrl+Shift+Delete
5. **Restart everything**:
   ```powershell
   # Stop server (Ctrl+C)
   # Delete cache
   Remove-Item -Recurse -Force .next
   # Restart
   npm run dev
   ```

---

## ✅ Verification Steps

After fixing issues, verify:
1. [ ] Server starts without errors
2. [ ] Can access http://localhost:3000
3. [ ] Can sign up with email
4. [ ] Can log in
5. [ ] Dashboard loads
6. [ ] No "Failed to load" errors
7. [ ] Can create a workflow
8. [ ] Workflows appear in list

---

**If all else fails**: Delete `.env.local`, copy `.env.example`, and start fresh with Firebase setup!
