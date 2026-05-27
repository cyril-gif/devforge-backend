import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const setAdmin = async () => {

    await mongoose.connect(process.env.MONGODB_URI); 
    
    const user = await User.findOne({ email: 'cyrillantam@gmail.com' });
    if (user) {
      user.role = 'admin';
      await user.save();
      console.log('Admin role assigned');
    } else {
      console.error('User not found');
    }
    process.exit();
};
setAdmin()
