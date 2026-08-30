import { sessionCookie } from './_lib/session.js';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  res.setHeader('Set-Cookie', sessionCookie('', 0));
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ authenticated: false });
}
