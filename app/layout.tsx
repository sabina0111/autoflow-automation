import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { ThreeBackground } from '@/components/three/ThreeBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AutoFlow - Workflow Automation System',
  description: 'Modern drag-and-drop workflow automation platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-dark-900 text-white`}>
        <ThemeProvider>
          <AuthProvider>
            {/* 3D Background */}
            <ThreeBackground enabled={true} />
            
            {/* Main content */}
            {children}
            
            {/* Toast notifications */}
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'bg-dark-800 text-white border border-dark-700',
                success: {
                  iconTheme: {
                    primary: '#0B60FF',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
