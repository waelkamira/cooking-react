import mongoose from 'mongoose';
import { User } from '../models/UserModel';
import bcrypt from 'bcrypt';

export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const { name, email, password } = await req.json();

  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new Error(
      'هذا الايميل موجود بالفعل قم بتسجيل الدخول او استخدم بريد الكتروني أخر'
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  // console.log('user', user);

  return Response.json(user);
}
