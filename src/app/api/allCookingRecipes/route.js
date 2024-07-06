import mongoose from 'mongoose';
import { Meal } from '../models/CreateMealModel';

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  // const pageNumber = await req.json();
  // console.log('pageNumber', pageNumber);
  const allCookingRecipes = await Meal?.find();
  return Response.json(allCookingRecipes.reverse());
}

export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const { _id } = await req.json();
  const deleteRecipe = await Meal?.findByIdAndDelete({ _id });
  return Response.json(deleteRecipe);
}
export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const {
    _id,
    usersWhoLikesThisRecipe,
    usersWhoPutEmojiOnThisRecipe,
    usersWhoPutHeartOnThisRecipe,
    ...rest
  } = await req.json();
  // console.log('id from backend', _id);
  // const recipe = await Meal?.findById({ _id });
  // console.log(recipe);
  const updateLikes = await Meal?.findByIdAndUpdate(
    { _id },
    {
      usersWhoLikesThisRecipe: usersWhoLikesThisRecipe,
      usersWhoPutEmojiOnThisRecipe: usersWhoPutEmojiOnThisRecipe,
      usersWhoPutHeartOnThisRecipe: usersWhoPutHeartOnThisRecipe,
      ...rest,
    }
  );
  // console.log(updateLikes);
  return Response.json(updateLikes);
}
