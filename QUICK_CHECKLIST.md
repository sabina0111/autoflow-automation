# ✅ DEPLOYMENT CHECKLIST

Copy and check off as you complete each step!

---

## ☐ STEP 1: Install Git (5 min)
- Go to: https://git-scm.com/download/win
- Download and install
- Restart PowerShell
- Test: `git --version`

## ☐ STEP 2: GitHub Account (2 min)
- Sign up: https://github.com/signup
- Verify your email

## ☐ STEP 3: Vercel Account (2 min)
- Sign up: https://vercel.com/signup
- Click "Continue with GitHub"

## ☐ STEP 4: Push Code (5 min)
```bash
git init
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git add .
git commit -m "Initial commit"
```
- Create repo: https://github.com/new (name: autoflow-automation)
```bash
git remote add origin https://github.com/USERNAME/autoflow-automation.git
git branch -M main
git push -u origin main
```

## ☐ STEP 5: Deploy (10 min)
- Vercel → Add New → Project
- Import your GitHub repo
- Add ALL environment variables from .env.local
- Click "Deploy"
- Wait 2-3 minutes
- Copy your URL: `https://________.vercel.app`

## ☐ STEP 6: Configure Firebase (5 min)
- Firebase Console → Authentication → Authorized domains
- Add your Vercel domain
- Firestore → Rules → Update security rules
- Publish

## ☐ STEP 7: TEST! (5 min)
- Visit your URL
- Sign up / Log in
- Create workflow
- Toggle dark mode
- All pages work

---

## 🎉 YOUR APP IS LIVE!

URL: `https://_________________.vercel.app`

Share it with anyone, anywhere! 🌍
