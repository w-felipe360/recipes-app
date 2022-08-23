import { SHOW_ALL_CATEGORIES } from './actiontypes';

export const showAllCategoriesAction = () => ({
  type: SHOW_ALL_CATEGORIES,
});

export const placeholder = () => ({
  type: 'placeholder',
});
// depois que adicionar outra action normal aqui deleta placeholder
// ele esta aqui so pra nao zoar com os exports
