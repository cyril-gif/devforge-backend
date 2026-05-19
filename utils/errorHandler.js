export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  console.error(`[ERROR] ${new Date().toISOString()}:`, err);
  
  res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : message
  });
};