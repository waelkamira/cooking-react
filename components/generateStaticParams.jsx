// utils/generateStaticParams.js

export async function generateStaticParams() {
  // Fetch your dynamic data here (e.g., recipe IDs)
  const response = await fetch('/api/allCookingRecipes');
  const data = await response.json();

  // Return an array of objects with keys matching your dynamic route parameter names
  return data.map((id) => ({ params: { recipeId: id.toString() } }));
}
