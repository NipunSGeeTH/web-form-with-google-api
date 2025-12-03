import bcrypt from 'bcryptjs';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
import type { Cookies } from '@sveltejs/kit';

// Users loaded from environment variables
const users: Record<string, string> = {
  [env.USER1_USERNAME || 'user1']: env.USER1_PASSWORD || '',
  [env.USER2_USERNAME || 'user2']: env.USER2_PASSWORD || '',
  [env.USER3_USERNAME || 'user3']: env.USER3_PASSWORD || '',
  [env.USER4_USERNAME || 'user4']: env.USER4_PASSWORD || '',
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
    const token = sign({ username }, env.JWT_SECRET, { expiresIn: '1h' });
    cookies.set('session', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600, path: '/' });

    throw redirect(303, '/form');
  },
};
