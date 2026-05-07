'use server';

import { cookies } from 'next/headers';
import { login as apiLogin, register as apiRegister, getMe as apiGetMe } from '@/lib/api/auth';

const COOKIE_NAME = 'dar-lemlih-token';

export async function loginAction(data: any) {
  try {
    const response = await apiLogin(data);
    cookies().set(COOKIE_NAME, response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return { success: true, user: response.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function registerAction(data: any) {
  try {
    // Backend RegisterRequest expects name, email, password, phone
    // AuthDialog provides name, email, password
    const response = await apiRegister({ ...data, phone: data.phone || '' });
    cookies().set(COOKIE_NAME, response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return { success: true, user: response.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logoutAction() {
  cookies().delete(COOKIE_NAME);
}

export async function getSessionAction() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const user = await apiGetMe(token);
    return user;
  } catch (error) {
    return null;
  }
}
