# 🚀 Deploy to Vercel - Complete Guide

## Prerequisites
✅ You already have:
- Next.js app ready
- Firebase project configured
- GitHub account (needed)
- Vercel account (free - we'll create)

---

## Step 1: Prepare Your Project for Deployment

### A. Install Vercel CLI (Optional but helpful)
```bash
npm install -g vercel
```

### B. Check Your Files Are Ready
- ✅ `.gitignore` includes `.env.local` (secrets won't be uploaded)
- ✅ `package.json` has build scripts
- ✅ Firebase credentials are in `.env.local`

---

## Step 2: Push Code to GitHub

### Option A: Using Git Commands (Recommended)

1. **Initialize Git (if not already done)**
```bash
cd C:\Users\jake6\Desktop\automation
git init
```

2. **Add all files**
```bash
git add .
```

3. **Commit your code**
```bash
git commit -m "Initial commit - AutoFlow Workflow Automation System"
```

4. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Repository name: `autoflow-automation` (or any name you like)
   - Set to **Public** or **Private** (your choice)
   - **DO NOT** initialize with README (we already have code)
   - Click "Create repository"

5. **Connect and push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/autoflow-automation.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Option B: Using GitHub Desktop (Easier for Beginners)

1. Download GitHub Desktop: https://desktop.github.com/
2. Open GitHub Desktop
3. Click "Add" → "Add Existing Repository"
4. Browse to `C:\Users\jake6\Desktop\automation`
5. Click "Publish repository"
6. Choose a name and set visibility
7. Click "Publish"

---

## Step 3: Deploy to Vercel

### Method 1: Deploy via Vercel Website (Easiest)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub"

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - You'll see your GitHub repositories
   - Find `autoflow-automation` (or your repo name)
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variables**
   Click "Environment Variables" and add these:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDw40CNltgcQHSH6OXnJAEQz6zoDrqqqrc
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=myproject-ici.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=myproject-ici
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=myproject-ici.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=816564040598
   NEXT_PUBLIC_FIREBASE_APP_ID=1:816564040598:web:ad1dacadd83b7f333463b7
   
   FIREBASE_ADMIN_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCf5nWv0m5EuKTB
5UBs/Ncy/Gy4+qvgrCUTUuwpmvZnooL356aYVZz0a6V3VotINz2oo6WndlVys48V
1A/vrtlMt0cqyTFFdlTAEVcJ/hKGkIkHIOjvsB+F0LzGfB1Td0aM7a96VmBPkGAc
X954skcJDked/tTNeB/j2/L6iM5gv77NDwbFstbH2GzRQDjYE2T4qe4WdgXns+Qu
pqItnpeWUtZcxzVahHOT/3Q8bzaSr4IXV6txxiJvBQ1KmQ+E9X+zte6oX05pyMpA
nZ54B6wi2q39mvy5SkjMRtZwNTS+17HY8EarUxMwHsZJhxBjhOzYgJJvDggTdXm5
Gu88GThTAgMBAAECggEAIKL41WS1hghL9Jl2v2gSAoGcLVtYtphcTufndQyAi6GT
ascY7VHYIdlQ4h1De39u8dtJBfe0tB8rLtDkWc8N4kcsWvLKwDtJTBSd99eob1fT
6CUS9k0z+eujhD2z/KPFPiGLZgR4TvUQcOoubeMxdYs5Gen4BGIm3Cq6GuHOgdd+
mw1DkvbbZSIx0RlRFJAnKwQet1cyCj5DCPHZCFSLZtuFaTwwMBF41Lmr2/RGHOat
FefQUXzCaFT9CQaCsXrTe7hqi02iHK49iksg6TOu7RJrgc91vRgCDIJQbbLTcfOv
ZDekOjZrSbau/6xZbx0iIKZ/nvkVQooGL22+Q5M1nQKBgQDPqTRicj7v+IBKUqHR
rjYa2Cgh2ZkHSz0xvIJrQS/228RDjPRucUzM8vaUP1P934QqzswaKZS0ZKcxLHHW
PIrGXU6ikZy+Lkpk4T3JvRmgbcdEUptOXu7AfukP7R3gFNesxPyxnEYsZRr5BcCD
LCjtcZeuwUSazTkCL3UQYn6GpwKBgQDFHyEk3zDCK5tn6YfnHPrkRWZPpl0HxRj2
ksYpPIhuWYdOMnCUyJfyJNuBsXN8Hq5od8BHabiwoSq01jF8tNVhiALf9t9lgC7Y
MMoDtS/ITs4aU6m2SN7HRBsqq7dhII7IdcZjiroogD4555JImPZLIqbICNUHlQDA
gJtIknCidQKBgQCCkMrFEzwLOd2/3VCtO7H9Eue40M3szhu9x97gfO4hcnBmYJvX
TRmSyzjKYT74Iq9BEyE1WeuLuLV+r4krwIkoy8YDZTZ+RTC1WQG2dFVGj394r8/C
aOII2kLDprzgBXrNwFV5ft6IT1G0PS+bygo5sPBECnSOOHadryUVljgjhQKBgQC+
VHtdLb/Xi+Fm6P8W8U1zAWtzNrAW44Fh+4AoqtEUs49Iur0ne7Py0xG7XUqjqsA+
EHpwuazhpwwkRbjMr5JktL4J4EX9rFIO3rT/9X9oimbI1sVEQ4IPpzwP7HOI7bXP
6qAe1wE+P+1VXbpKLJ+LFq8w8A45Xu618Ld+0B6/TQKBgQCRMQvRNYua5gpuXDW9
pA7hxF/EIR+yDETdVrtsAeQzQ9FfX7ftEHhwPTgTMmx3HVBATMdPri3sSCkeugvX
P/WxDmtwVXl3ewEd0tWzmkfzcWjr3iFM3kj9W+ZsX4d7W09mjF7Iwju9BSDda6Dg
SU9TWB3B/jm7TqFH074eCM6H0Q==
-----END PRIVATE KEY-----
   
   FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-qnz5k@myproject-ici.iam.gserviceaccount.com
   ```

   **IMPORTANT**: For `FIREBASE_ADMIN_PRIVATE_KEY`, paste the ENTIRE key as shown above (without the quotes, newlines will be preserved)

5. **Click "Deploy"**
   - Vercel will build and deploy your app
   - This takes 2-3 minutes
   - You'll see a progress log

6. **Success! 🎉**
   - You'll get a URL like: `https://autoflow-automation.vercel.app`
   - Click "Visit" to see your live app!

---

## Step 4: Configure Firebase for Production

### Update Firebase Authentication Settings

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: **myproject-ici**
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click "Add domain"
5. Add your Vercel URL: `autoflow-automation.vercel.app`
6. Click "Add"

### Update Firestore Security Rules (Important!)

1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace with these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /workflows/{workflowId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    
    match /records/{recordId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

---

## Step 5: Test Your Live App

1. Visit your Vercel URL
2. Test these features:
   - ✅ Sign up / Log in
   - ✅ Create a workflow
   - ✅ Add records
   - ✅ Dark mode toggle
   - ✅ All pages load correctly

---

## Method 2: Deploy via Vercel CLI (Alternative)

If you prefer command line:

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? autoflow-automation
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# ... (add all env variables)

# Deploy to production
vercel --prod
```

---

## Updating Your App After Changes

Every time you make changes:

1. **Commit and push to GitHub**
```bash
git add .
git commit -m "Description of changes"
git push
```

2. **Automatic Deployment**
   - Vercel automatically detects the push
   - Rebuilds and redeploys your app
   - No manual steps needed!

---

## Custom Domain (Optional)

Want a custom domain like `autoflow.com`?

1. Buy a domain from Namecheap, GoDaddy, etc.
2. In Vercel Dashboard → Project → Settings → Domains
3. Add your domain
4. Follow Vercel's DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Make sure `npm run build` works locally first

### App Loads But Errors
- Check browser console for errors
- Verify Firebase authorized domains include your Vercel URL
- Check Vercel Function Logs for API errors

### Authentication Doesn't Work
- Verify Firebase authorized domains
- Check that all Firebase env variables are correctly set
- Make sure Google Sign-In is enabled in Firebase Console

---

## Your URLs After Deployment

- **Production URL**: `https://your-project-name.vercel.app`
- **Preview URLs**: Vercel creates preview URLs for each git branch
- **Analytics**: Available in Vercel Dashboard

---

## Free Tier Limits (Vercel Hobby Plan)

✅ You get for FREE:
- Unlimited deployments
- 100GB bandwidth per month
- Automatic HTTPS
- Global CDN
- Preview deployments
- Analytics

This is more than enough for your workflow automation app!

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Firebase Docs: https://firebase.google.com/docs
- GitHub Issues: Create in your repo

---

**Ready to deploy? Follow the steps above and your app will be live in minutes!** 🚀
