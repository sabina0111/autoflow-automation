'use client';

import { useState } from 'react';
import { Zap, FileSpreadsheet, Check, Copy, ExternalLink, Webhook } from 'lucide-react';
import toast from 'react-hot-toast';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function IntegrationsPage() {
  const [copied, setCopied] = useState(false);
  const webhookUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/zapier/webhook`
    : 'https://your-domain.com/api/zapier/webhook';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const integrations = [
    {
      name: 'Zapier',
      icon: Zap,
      description: 'Trigger automations when records are created or updated',
      color: 'orange',
      status: 'available'
    },
    {
      name: 'Google Sheets',
      icon: FileSpreadsheet,
      description: 'Export workflow data to Google Sheets',
      color: 'green',
      status: 'available'
    },
    {
      name: 'Webhooks',
      icon: Webhook,
      description: 'Send data to custom webhook endpoints',
      color: 'blue',
      status: 'available'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Integrations
          </h1>
          <p className="text-gray-400">
            Connect your workflows with external tools and services
          </p>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            const colors: Record<string, string> = {
              orange: 'from-orange-500/20 to-orange-600/5 border-orange-500/30',
              green: 'from-green-500/20 to-green-600/5 border-green-500/30',
              blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/30'
            };

            return (
              <Card key={integration.name} hover padding="md" className={`bg-gradient-to-br ${colors[integration.color]}`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-dark-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {integration.description}
                    </p>
                    <div className="inline-flex items-center px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-400">
                      <Check className="w-3 h-3 mr-1" />
                      Available
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Zapier Integration Card */}
        <Card>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Zapier Webhook
              </h2>
              <p className="text-gray-400">
                Use this webhook URL to trigger Zapier automations when records are created or updated
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Webhook URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={webhookUrl}
                  readOnly
                  className="flex-1 px-4 py-2.5 bg-dark-700 border border-dark-600 rounded-lg text-white"
                />
                <Button
                  variant="secondary"
                  onClick={() => copyToClipboard(webhookUrl)}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-primary-400 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                How to use with Zapier:
              </h3>
              <ol className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2">
                  <span className="text-primary-400 font-semibold">1.</span>
                  Create a new Zap in Zapier
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-400 font-semibold">2.</span>
                  Choose "Webhooks by Zapier" as the trigger
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-400 font-semibold">3.</span>
                  Select "Catch Hook" and copy the URL above
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-400 font-semibold">4.</span>
                  Configure your workflow to send data to this webhook
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-400 font-semibold">5.</span>
                  Set up your desired action in Zapier
                </li>
              </ol>
            </div>

            <Button
              variant="outline"
              onClick={() => window.open('https://zapier.com', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Zapier Dashboard
            </Button>
          </div>
        </Card>

        {/* Google Sheets Integration */}
        <Card>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileSpreadsheet className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Google Sheets Export
              </h2>
              <p className="text-gray-400">
                Export your workflow data directly to Google Sheets for further analysis
              </p>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-400">
              Go to any workflow and use the "Export to Sheets" button to send your data to Google Sheets.
              You'll need to authorize access to your Google account.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => window.location.href = '/dashboard/workflows'}
          >
            Go to Workflows
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
