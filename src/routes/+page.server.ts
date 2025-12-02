import bcrypt from 'bcryptjs';
import { google } from 'googleapis';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';

// Hardcoded users with bcrypt hashed passwords
const users: Record<string, string> = {
  user1: '$2y$12$IpDZfWZnlK0tFBVSLXa8He5fQQ/mm8r3XanVhSyoIhYp0boTYCa/G', // hash for 'password'
  user2: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // same for demo
  user3: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  user4: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
};

export const actions = {
  default: async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
    const data = await request.formData();
    const username = data.get('username')?.toString();
    const password = data.get('password')?.toString();

    if (!username || !password) {
      return { error: 'Username and password required' };
    }

    if (!users[username]) {
      return { error: 'Invalid username' };
    }

    const isValid = await bcrypt.compare(password, users[username]);
    if (!isValid) {
      return { error: 'Invalid password' };
    }

    // Generate JWT
    const token = jwt.sign({ username }, env.JWT_SECRET, { expiresIn: '1h' });
    cookies.set('session', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600, path: '/' });

    // Store login in Google Sheet
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
        range: 'Sheet1!A:B',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[username, new Date().toISOString()]],
        },
      });
    } catch (error) {
      console.error('Failed to store login:', error);
      // Continue to redirect even if sheet fails
    }

    throw redirect(303, '/form');
  },
};
