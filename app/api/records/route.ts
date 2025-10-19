import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// GET /api/records - Get all records for a workflow
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const workflowId = request.nextUrl.searchParams.get('workflowId');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let query = adminDb.collection('records').where('userId', '==', userId);
    
    if (workflowId) {
      query = query.where('workflowId', '==', workflowId);
    }

    const snapshot = await query.get();
    
    const records = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ records });
  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/records - Create a new record
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { workflowId, data } = body;

    if (!workflowId || !data) {
      return NextResponse.json(
        { error: 'Workflow ID and data are required' },
        { status: 400 }
      );
    }

    const recordData = {
      userId,
      workflowId,
      data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await adminDb.collection('records').add(recordData);

    // Trigger Zapier webhook if configured
    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(process.env.ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'record_created',
            recordId: docRef.id,
            workflowId,
            data,
          }),
        });
      } catch (zapierError) {
        console.error('Zapier webhook error:', zapierError);
      }
    }

    return NextResponse.json({
      id: docRef.id,
      ...recordData,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating record:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/records/:id - Update a record
export async function PUT(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { recordId, data } = body;

    if (!recordId || !data) {
      return NextResponse.json(
        { error: 'Record ID and data are required' },
        { status: 400 }
      );
    }

    const docRef = adminDb.collection('records').doc(recordId);
    const doc = await docRef.get();

    if (!doc.exists || doc.data()?.userId !== userId) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    await docRef.update({
      data,
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/records/:id - Delete a record
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    const recordId = request.nextUrl.searchParams.get('id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!recordId) {
      return NextResponse.json({ error: 'Record ID is required' }, { status: 400 });
    }

    const docRef = adminDb.collection('records').doc(recordId);
    const doc = await docRef.get();

    if (!doc.exists || doc.data()?.userId !== userId) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    await docRef.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
