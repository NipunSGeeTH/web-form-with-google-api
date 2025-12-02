import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { google } from 'googleapis';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';

export const load = async ({ cookies }: { cookies: Cookies }) => {
  const token = cookies.get('session');
  if (!token) {
    throw redirect(303, '/');
  }

  try {
    verify(token, env.JWT_SECRET);
  } catch {
    throw redirect(303, '/');
  }
};

export const actions = {
  default: async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
    const token = cookies.get('session');
    if (!token) {
      throw redirect(303, '/');
    }

    let decoded: { username: string };
    try {
      decoded = verify(token, env.JWT_SECRET) as { username: string };
    } catch {
      throw redirect(303, '/');
    }

    const data = await request.formData();
    const email = data.get('email')?.toString();
    const phone = data.get('phone')?.toString();
    const address = data.get('address')?.toString();
    const country = data.get('country')?.toString();
    const gender = data.get('gender')?.toString();
    const agree = data.get('agree') ? 'Yes' : 'No';

    if (!email || !phone || !address || !country || !gender) {
      return { error: 'All fields are required' };
    }

    // Authenticate Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: env.GOOGLE_SHEET_ID,
        range: 'Sheet1!A:H',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[decoded.username, email, phone, address, country, gender, agree, new Date().toISOString()]],
        },
      });
      return { success: 'Data submitted successfully' };
    } catch (error) {
      console.error(error);
      return { error: 'Failed to store data' };
    }
  },
};
