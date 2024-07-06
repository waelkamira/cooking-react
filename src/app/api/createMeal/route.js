import mongoose from 'mongoose';
import { Meal } from '../models/CreateMealModel';
export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const data = await req.json();
  // console.log('data', data);
  const meal = await Meal.create({ ...data });
  return Response.json(meal);
}
