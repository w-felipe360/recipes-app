import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import favoriteIcon from '../images/blackHeartIcon.svg';
// import shareIcon from '../images/shareIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const FavoriteRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes')) || [{ id: 52977, type: 'food', nationality: 'Turkish', category: 'Side', alcoholicOrNot: 'Non alcoholic', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' }];
    setRecipes(data);
    console.log(data);
  }, []);

  const { clipboard } = navigator;

  const showMessage = ({ target }) => {
    const span = target.parentNode.nextElementSibling.nextElementSibling;
    span.innerHTML = 'Link copied!';
    setTimeout(() => {
      span.innerHTML = '';
    }, +'2000');
  };

  return (
    <div>
      <Header />
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drink
        </button>
      </section>
      <section>
        {
          recipes.map((recipe, index) => (
            recipe.type === 'food' ? (
              <section key={ index }>
                <img
                  src={ recipe.image }
                  alt={ `Imagem da comida ${recipe.name}` }
                  data-testid={ `${index}-horizontal-image` }
                />
                <h2 data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </h2>
                <p>
                  { recipe.category }
                </p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${recipe.nationality} - ${recipe.category}` }
                </p>
                <button
                  type="button"
                  onClick={ (event) => {
                    clipboard.writeText(`http://localhost:3000/foods/${recipe.id}`);
                    showMessage(event);
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt="Imagem de compartilhar"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <button type="button">
                  <img
                    src={ favoriteIcon }
                    alt="Imagem de favoritar"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
                <span>{}</span>
              </section>
            ) : (
              <section key={ index }>
                <img
                  src={ recipe.image }
                  alt={ `Imagem da comida ${recipe.name}` }
                  data-testid={ `${index}-horizontal-image` }
                />
                <h2 data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </h2>
                <p>
                  { recipe.category }
                </p>
                <p>
                  { `${recipe.nationality} - ${recipe.category}` }
                </p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.alcoholicOrNot }
                </p>
                <button
                  type="button"
                  onClick={ (event) => {
                    clipboard.writeText(`http://localhost:3000/drinks/${recipe.id}`);
                    showMessage(event);
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt="Imagem de compartilhar"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <button type="button">
                  <img
                    src={ favoriteIcon }
                    alt="Imagem de favoritar"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
                <span>{}</span>
              </section>
            )))
        }
      </section>
      <span>{}</span>
    </div>
  );
};

export default FavoriteRecipes;
