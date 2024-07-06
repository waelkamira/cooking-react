export async function generateStaticParams() {
  const response = await fetch('/api/allCookingRecipes'); // Fetch all recipes
  const recipes = await response.json();

  // Return an object with params containing recipe IDs
  return {
    params: recipes.map((recipe) => ({ id: recipe._id })), // Use recipe._id for dynamic segment
  };
}
