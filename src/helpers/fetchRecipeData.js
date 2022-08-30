export const fetchRecipeData = async (isMeal, id) => {
  const foodEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drinkEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const endpoint = isMeal ? foodEndpoint : drinkEndpoint;
  const fetchData = await fetch(endpoint);
  const response = await fetchData.json();
  const object = response?.meals || response?.drinks;
  return object[0];
};

export const fetchRecommendationData = async (isMeal) => {
  const foodEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const drinkEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const endpoint = isMeal ? foodEndpoint : drinkEndpoint;
  const fetchData = await fetch(endpoint);
  const response = await fetchData.json();
  const flattenedResponse = response?.meals || response?.drinks;
  const maxRecipes = 6;
  const filteredResponse = flattenedResponse.slice(0, maxRecipes);
  return filteredResponse;
};
