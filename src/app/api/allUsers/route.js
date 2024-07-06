import mongoose from 'mongoose';
import { User } from '../models/UserModel';

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const users = await User.find();
  return Response.json(users);
}

export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const { email } = await req.json();
  const deleteUser = await User.findOneAndDelete({ email });
  return Response.json(deleteUser);
}
