export const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    console.error('Please check your .env file');
    process.exit(1);
  }
  
  // Validate MongoDB URI format
  if (!process.env.MONGODB_URI.startsWith('mongodb')) {
    console.error('❌ MONGODB_URI must start with mongodb:// or mongodb+srv://');
    process.exit(1);
  }
  
  // Validate JWT_SECRET length
  if (process.env.JWT_SECRET.length < 10) {
    console.warn('⚠️ Warning: JWT_SECRET is too short. Use at least 10 characters in production.');
  }
  
  console.log('✅ Environment variables validated');
};