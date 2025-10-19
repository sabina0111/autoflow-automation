# 🚀 Workflow Automation System

A complete web-based workflow automation system that replaces Google Sheets with a powerful drag-and-drop interface. Built with Next.js, Firebase, and modern web technologies.

## ✨ Features

- **Drag-and-Drop Workflow Builder**: Create custom forms and tables visually
- **Real-time Dashboard**: View and manage data with live updates
- **User Authentication**: Email/password and Google Sign-In support
- **Role-Based Access Control**: Admin and standard user roles
- **CRUD Operations**: Full create, read, update, delete functionality
- **Zapier Integration**: Trigger automations with webhooks
- **Google Sheets Export**: Export workflow data to spreadsheets
- **Analytics Dashboard**: Track workflows, records, and activity
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Charts**: Recharts
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A **Firebase account** - [Sign up here](https://firebase.google.com/)
- A **code editor** (VS Code recommended)

## 🔧 Step 1: Firebase Setup

### 1.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "workflow-automation")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 1.2 Enable Authentication

1. In Firebase Console, click "Authentication" in the left sidebar
2. Click "Get started"
3. Enable these sign-in methods:
   - **Email/Password**: Click "Email/Password" → Enable → Save
   - **Google**: Click "Google" → Enable → Save

### 1.3 Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in test mode" (we'll secure it later)
4. Choose a location (select closest to you)
5. Click "Enable"

### 1.4 Get Firebase Configuration

1. Go to Project Settings (gear icon in sidebar)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register your app with a nickname (e.g., "workflow-app")
5. Copy the Firebase configuration object - you'll need this!

It looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 1.5 Get Firebase Admin Credentials

1. Go to Project Settings → Service Accounts
2. Click "Generate new private key"
3. Click "Generate key" - a JSON file will download
4. Open this file and find:
   - `client_email` - you'll need this
   - `private_key` - you'll need this

## 🚀 Step 2: Install and Configure the Project

### 2.1 Install Dependencies

Open PowerShell in the project folder and run:

```powershell
npm install
```

Wait for all packages to install (this may take a few minutes).

### 2.2 Configure Environment Variables

1. Copy the example environment file:
```powershell
copy .env.example .env.local
```

2. Open `.env.local` in your code editor

3. Fill in your Firebase configuration from Step 1.4:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Fill in Firebase Admin credentials from Step 1.5:
```env
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

**Important**: Keep the quotes around the private key and don't remove the `\n` characters!

5. (Optional) Add Zapier webhook URL:
```env
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/your-webhook-url
```

## ▶️ Step 3: Run the Application

Start the development server:

```powershell
npm run dev
```

You should see:
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

Open your browser and go to: **http://localhost:3000**

## 👤 Step 4: Create Your First User

1. Click "Get Started" or "Sign Up"
2. Enter your information:
   - Full Name
   - Email
   - Password (minimum 6 characters)
3. Click "Sign up"
4. You'll be automatically logged in and redirected to the dashboard!

## 🎨 Step 5: Create Your First Workflow

1. Click "New Workflow" button
2. Enter workflow details:
   - **Name**: e.g., "Customer Onboarding"
   - **Description**: e.g., "Track new customer information"
3. Click "Add Field" to add form fields
4. For each field, configure:
   - **Field Name**: e.g., "Full Name", "Email", "Phone"
   - **Field Type**: Choose from Text, Number, Email, Date, Select, Checkbox
   - **Required**: Check if field is mandatory
5. Drag fields to reorder them (click and hold the grip icon)
6. Click "Create Workflow"

## 📊 Using the Dashboard

### View Workflows
- Navigate to "Workflows" to see all your workflows
- Click on a workflow to view details
- Edit or delete workflows as needed

### Analytics
- Go to "Analytics" to see:
  - Total workflows and records
  - Weekly activity charts
  - Workflow performance metrics

### Integrations
- Go to "Integrations" to:
  - Get your Zapier webhook URL
  - Learn how to export to Google Sheets
  - Configure custom webhooks

## 🔗 Zapier Integration Setup

1. Go to [Zapier](https://zapier.com/)
2. Create a new Zap
3. Choose "Webhooks by Zapier" as trigger
4. Select "Catch Hook"
5. Copy the webhook URL from the Integrations page
6. Paste it in your `.env.local` as `ZAPIER_WEBHOOK_URL`
7. Test by creating a record in your workflow
8. Continue setting up your Zap action (email, Slack, etc.)

## 📤 Google Sheets Export (Optional)

To enable Google Sheets export:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google Sheets API
4. Create a Service Account
5. Download the JSON key file
6. Add to `.env.local`:
```env
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com/)
2. Sign up/login with GitHub
3. Click "Add New" → "Project"
4. Import your Git repository
5. Configure environment variables:
   - Add all variables from `.env.local`
   - Click "Add" for each variable
6. Click "Deploy"
7. Wait for deployment to complete
8. Your app will be live at `your-app.vercel.app`

### Option 2: Deploy via CLI

```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

### After Deployment

1. Update Firebase Auth settings:
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain to "Authorized domains"

2. Update Firestore Security Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
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

## 📁 Project Structure

```
automation/
├── app/                       # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── workflows/        # Workflow CRUD endpoints
│   │   ├── records/          # Record CRUD endpoints
│   │   ├── zapier/           # Zapier webhook endpoint
│   │   └── export/           # Google Sheets export
│   ├── dashboard/            # Dashboard pages
│   │   ├── workflows/        # Workflow management
│   │   ├── analytics/        # Analytics dashboard
│   │   ├── integrations/     # Integrations page
│   │   └── settings/         # User settings
│   ├── login/                # Login page
│   ├── signup/               # Signup page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/               # Reusable components
│   └── dashboard/            # Dashboard-specific components
├── contexts/                 # React contexts
│   └── AuthContext.tsx       # Authentication context
├── lib/                      # Utility libraries
│   ├── firebase.ts           # Firebase client config
│   └── firebase-admin.ts     # Firebase admin config
├── styles/                   # Global styles
│   └── globals.css           # Tailwind CSS
├── types/                    # TypeScript types
│   └── index.ts              # Type definitions
├── .env.example              # Environment variables template
├── package.json              # Dependencies
└── README.md                 # This file
```

## 🛡️ Security Best Practices

1. **Never commit `.env.local`** - it contains sensitive keys
2. **Use Firebase Security Rules** - protect your database
3. **Enable Firestore indexes** - improve query performance
4. **Rotate API keys regularly** - keep credentials fresh
5. **Enable 2FA** - for your Firebase and Vercel accounts

## 🐛 Troubleshooting

### "Cannot find module" errors
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Firebase authentication errors
- Check that your `.env.local` has the correct values
- Verify Firebase Auth is enabled in Firebase Console
- Make sure your domain is in Firebase authorized domains

### Build errors
```powershell
# Clear Next.js cache
Remove-Item -Recurse -Force .next
npm run build
```

### Port already in use
```powershell
# Use a different port
npm run dev -- -p 3001
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Support

If you encounter any issues:

1. Check this README thoroughly
2. Review the Firebase Console for configuration
3. Check the browser console for errors (F12)
4. Verify all environment variables are set correctly

## 📝 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Next.js and Firebase**
