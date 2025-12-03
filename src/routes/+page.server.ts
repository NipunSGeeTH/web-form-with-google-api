import bcrypt from 'bcryptjs';
import { JWT_SECRET, USER1_USERNAME, USER1_PASSWORD, USER2_USERNAME, USER2_PASSWORD, USER3_USERNAME, USER3_PASSWORD, USER4_USERNAME, USER4_PASSWORD } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';

// Users loaded from environment variables
const users: Record<string, string> = {
  [USER1_USERNAME || 'user1']: USER1_PASSWORD || '',
  [USER2_USERNAME || 'user2']: USER2_PASSWORD || '',
  [USER3_USERNAME || 'user3']: USER3_PASSWORD || '',
  [USER4_USERNAME || 'user4']: USER4_PASSWORD || '',
};

const { sign } = jwt;

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
    const token = sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    cookies.set('session', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600, path: '/' });

    throw redirect(303, '/form');
  },
};
