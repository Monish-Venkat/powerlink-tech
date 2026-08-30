import { createHmac, timingSafeEqual } from 'node:crypto';

const OWNER_EMAIL = 'powerlink2008@gmail.com';
const SESSION_SECONDS = 60 * 60 * 12;

const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const decode = (value) => JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
const signature = (value, secret) => createHmac('sha256', secret).update(value).digest('base64url');

export function ownerEmail() { return OWNER_EMAIL; }

export function passwordIsValid(password) {
  const expected = process.env.INVOICE_OWNER_PASSWORD;
  if (!expected || !password) return false;
  const expectedValue = Buffer.from(expected);
  const suppliedValue = Buffer.from(password);
  return expectedValue.length === suppliedValue.length && timingSafeEqual(expectedValue, suppliedValue);
}

export function createSession() {
  const secret = process.env.INVOICE_AUTH_SECRET;
  if (!secret) throw new Error('Invoice authentication is not configured.');
  const payload = encode({ email: OWNER_EMAIL, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS });
  return `${payload}.${signature(payload, secret)}`;
}

export function hasValidSession(cookieHeader = '') {
  const secret = process.env.INVOICE_AUTH_SECRET;
  const token = cookieHeader.split(';').map(item => item.trim()).find(item => item.startsWith('plt_invoice_session='))?.split('=')[1];
  if (!secret || !token) return false;
  const [payload, suppliedSignature] = token.split('.');
  if (!payload || !suppliedSignature) return false;
  const expectedSignature = signature(payload, secret);
  const expected = Buffer.from(expectedSignature);
  const supplied = Buffer.from(suppliedSignature);
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return false;
  try {
    const data = decode(payload);
    return data.email === OWNER_EMAIL && Number(data.exp) > Math.floor(Date.now() / 1000);
  } catch { return false; }
}

export function sessionCookie(token, maxAge = SESSION_SECONDS) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  return `plt_invoice_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}`;
}
