import { createSession, ownerEmail, passwordIsValid, sessionCookie } from './lib/session.js';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  if (!process.env.INVOICE_OWNER_PASSWORD || !process.env.INVOICE_AUTH_SECRET) return res.status(503).json({ error: 'Invoice login is not configured in this environment.' });
  const { email, password } = req.body ?? {};
  if (String(email ?? '').trim().toLowerCase() !== ownerEmail() || !passwordIsValid(String(password ?? ''))) return res.status(401).json({ error: 'Email or password is not valid.' });
  try {
    res.setHeader('Set-Cookie', sessionCookie(createSession()));
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ authenticated: true });
  } catch {
    return res.status(503).json({ error: 'Invoice login is not configured yet.' });
  }
}
