import React from 'react';
import PropTypes from 'prop-types';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipeData: { index, thumbnail, recipeName } }) => {
  console.log(index);
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className={ styles.container }
    >
      <img
        className={ styles['card-image'] }
        data-testid={ `${index}-card-img` }
        alt="foto"
        src={ thumbnail }
      />
      <span data-testid={ `${index}-card-name` }>
        { recipeName }
      </span>
    </div>
  );
};

RecipeCard.propTypes = {
  recipeData: PropTypes.shape({
    index: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    recipeName: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
