import mongoose from 'mongoose';
import { Favorite } from '../models/FavoritePosts';
import { getServerSession } from 'next-auth';
import { authOptions } from '../authOptions/route';

export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const data = await req.json();
  //   console.log('data from favoritePosts', data);
  const FavoritePost = await Favorite.create({ ...data });
  return Response.json(FavoritePost);
}

export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const data = await req.json();
  const deleteFavoritePost = await Favorite.findByIdAndDelete(data?._id);
  return Response.json(deleteFavoritePost);
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);
  const session = await getServerSession(authOptions);
  const favoritedByUser = session?.user?.email;
  // console.log('favoritedByUser', favoritedByUser);
  const favoritePosts = await Favorite.find({ favoritedByUser });
  // console.log('favoritePosts', favoritePosts);
  return Response.json(favoritePosts);
}
