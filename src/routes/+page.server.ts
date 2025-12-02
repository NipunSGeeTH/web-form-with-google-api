import bcrypt from 'bcryptjs';
import { google } from 'googleapis';
import { env } from '$env/dynamic/private';

// Hardcoded users with bcrypt hashed passwords
const users: Record<string, string> = {
  user1: '$2y$12$IpDZfWZnlK0tFBVSLXa8He5fQQ/mm8r3XanVhSyoIhYp0boTYCa/G', // hash for 'password'
  user2: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // same for demo
  user3: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  user4: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
};

export const actions = {
  default: async ({ request }) => {
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
        range: 'Sheet1!A:B',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[username, new Date().toISOString()]],
        },
      });
      return { success: 'Login successful and stored in Google Sheet' };
    } catch (error) {
      console.error(error);
      return { error: 'Failed to store in Google Sheet' };
    }
  },
};
