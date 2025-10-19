import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// POST /api/export/sheets - Export workflow data to Google Sheets
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workflowName, fields, records } = body;

    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL || !process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'Google Sheets integration not configured' },
        { status: 400 }
      );
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Create a new spreadsheet
    const createResponse = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `${workflowName} - Export ${new Date().toLocaleDateString()}`,
        },
      },
    });

    const spreadsheetId = createResponse.data.spreadsheetId;

    // Prepare headers (field names)
    const headers = fields.map((f: any) => f.name);
    
    // Prepare data rows
    const rows = records.map((record: any) => 
      fields.map((field: any) => record.data[field.id] || '')
    );

    // Add headers and data to the sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId!,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers, ...rows],
      },
    });

    return NextResponse.json({
      success: true,
      spreadsheetId,
      url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
    });
  } catch (error) {
    console.error('Error exporting to Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to export to Google Sheets' },
      { status: 500 }
    );
  }
}
