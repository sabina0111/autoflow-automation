# 📋 Setup Checklist

Use this checklist to make sure everything is configured correctly.

## ✅ Pre-Setup

- [ ] Node.js installed (check: `node --version` should show v18+)
- [ ] npm installed (check: `npm --version`)
- [ ] Firebase account created at console.firebase.google.com
- [ ] Code editor installed (VS Code recommended)

## ✅ Firebase Configuration

- [ ] Firebase project created
- [ ] Email/Password authentication enabled
- [ ] Google authentication enabled
- [ ] Firestore database created in test mode
- [ ] Firebase web app registered
- [ ] Firebase config copied (apiKey, authDomain, etc.)
- [ ] Service account private key downloaded

## ✅ Project Setup

- [ ] Dependencies installed (`npm install` completed)
- [ ] `.env.local` file created (copied from `.env.example`)
- [ ] All Firebase variables filled in `.env.local`
- [ ] NEXT_PUBLIC_FIREBASE_API_KEY set
- [ ] NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN set
- [ ] NEXT_PUBLIC_FIREBASE_PROJECT_ID set
- [ ] NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET set
- [ ] NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID set
- [ ] NEXT_PUBLIC_FIREBASE_APP_ID set
- [ ] FIREBASE_ADMIN_CLIENT_EMAIL set
- [ ] FIREBASE_ADMIN_PRIVATE_KEY set (with quotes and \n preserved)

## ✅ Optional Integrations

- [ ] Zapier webhook URL configured (optional)
- [ ] Google Sheets API enabled (optional)
- [ ] Google Sheets service account created (optional)
- [ ] GOOGLE_SHEETS_CLIENT_EMAIL set (optional)
- [ ] GOOGLE_SHEETS_PRIVATE_KEY set (optional)

## ✅ First Run

- [ ] Development server started (`npm run dev`)
- [ ] No errors in terminal
- [ ] App opens at http://localhost:3000
- [ ] Landing page loads correctly
- [ ] Sign up page accessible
- [ ] Can create a test account

## ✅ Testing Features

- [ ] User registration works
- [ ] Login works
- [ ] Dashboard loads
- [ ] Can create a workflow
- [ ] Drag-and-drop works for fields
- [ ] Can reorder fields
- [ ] Workflow saves successfully
- [ ] Workflows list shows created workflow
- [ ] Analytics page loads
- [ ] Integrations page accessible
- [ ] Settings page accessible

## ✅ Deployment (Optional)

- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Environment variables added to Vercel
- [ ] Deployed successfully
- [ ] Production URL works
- [ ] Can sign up in production
- [ ] Firebase authorized domains updated

## 🐛 Troubleshooting

If you check a box but it doesn't work:

1. **Node.js not installed**
   - Download from nodejs.org
   - Install LTS version
   - Restart terminal

2. **npm install fails**
   - Delete `node_modules` folder
   - Delete `package-lock.json`
   - Run `npm install` again

3. **Firebase errors**
   - Double-check all values in `.env.local`
   - No extra spaces or quotes (except around private key)
   - Restart dev server after changes

4. **Port in use**
   - Run on different port: `npm run dev -- -p 3001`

5. **Build errors**
   - Clear cache: Delete `.next` folder
   - Run `npm run build` to check for issues

6. **Authentication fails**
   - Check Firebase Console > Authentication is enabled
   - Verify domain in Firebase > Authorized domains
   - Check browser console (F12) for errors

## 📝 Notes

- Keep `.env.local` private - never commit to Git
- Test locally before deploying
- Use test mode for Firestore initially
- Set up security rules before going live

---

**All checked? You're ready to build! 🚀**
