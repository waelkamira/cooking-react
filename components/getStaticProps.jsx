// pages/getStaticProps.js

export async function getStaticProps({ params }) {
  const { recipeId } = params;
  const response = await fetch(`/api/allCookingRecipes/${recipeId}`);
  const recipeData = await response.json();

  return {
    props: {
      recipeData,
    },
  };
}
