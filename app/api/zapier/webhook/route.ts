import { NextRequest, NextResponse } from 'next/server';

// POST /api/zapier/webhook - Receive webhooks from Zapier
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Received Zapier webhook:', body);

    // Here you can process the webhook data
    // For example, create a new record, trigger an action, etc.
    
    // Example: You might want to store this in Firebase or trigger other automations
    
    return NextResponse.json({
      success: true,
      message: 'Webhook received successfully',
      receivedData: body,
    });
  } catch (error) {
    console.error('Error processing Zapier webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

// GET /api/zapier/webhook - Test endpoint
export async function GET() {
  return NextResponse.json({
    message: 'Zapier webhook endpoint is active',
    instructions: 'Send POST requests with your automation data',
  });
}
