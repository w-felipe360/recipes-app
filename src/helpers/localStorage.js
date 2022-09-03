export const createLocalStorage = (key, initialState = []) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    localStorage.setItem(key, JSON.stringify(initialState));
  }
};

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

export const setLocalStorage = (key, payload) => localStorage.setItem(key, JSON
  .stringify(payload));

export const saveTokenToLocalStorage = (key, payload) => localStorage
  .setItem(key, payload);

export const getToken = () => {
  const data = localStorage.getItem('token');
  return data;
};

export const removeFavoriteRecipe = (id) => {
  createLocalStorage('favoriteRecipes');
  const data = getLocalStorage('favoriteRecipes');
  const filteredData = data.filter((favoriteRecipe) => favoriteRecipe.id !== id);
  setLocalStorage('favoriteRecipes', filteredData);
  return (filteredData);
};

export const addToLocalStorage = (key, payload, initialState) => {
  createLocalStorage(key, initialState);
  const data = getLocalStorage(key);
  const updatedData = [...data, payload];
  setLocalStorage(key, updatedData);
};

export const addRecipeInProgressToStorage = (key, payload, isMeal) => {
  createLocalStorage(key, {});
  const data = getLocalStorage(key);
  const updatedData = isMeal
    ? { ...data, meals: { ...payload } }
    : { ...data, cocktails: { ...payload } };
  setLocalStorage(key, updatedData);
};
