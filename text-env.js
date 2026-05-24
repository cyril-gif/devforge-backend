import dotenv from 'dotenv';
dotenv.config();
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'set' : 'missing');
console.log('RESEND_API_KEY loaded:', !!process.env.RESEND_API_KEY);
console.log('BACKEND_URL:', process.env.BACKEND_URL);
