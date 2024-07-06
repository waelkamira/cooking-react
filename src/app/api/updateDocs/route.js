import mongoose from 'mongoose';

export async function UpdateDocs(req, res) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB);

  const result = await User.updateMany(
    {},
    {
      $set: {
        numberOfLikes: 0,
      },
    }
  );
  return Response.json(result);
}
