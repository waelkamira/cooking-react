import mongoose from 'mongoose';
import { User } from '../models/UserModel';
import bcrypt from 'bcrypt';

export async function RegisterGoogleUser(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const { name, email, picture } = await req.json();

  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new Error(
      'هذا الايميل موجود بالفعل قم بتسجيل الدخول او استخدم بريد الكتروني أخر'
    );
  }
  const user = await User.create({ name, email, image: picture });
  // console.log('user', user);

  return Response.json(user);
}
