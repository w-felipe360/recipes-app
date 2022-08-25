import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';

function RecipeCard({ recipeData: { index, thumbnail, recipeName, id, pathname } }) {
  console.log();
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className={ styles.container }
    >
      <Link to={ `${pathname}/${id}` } data-testid="card-link">
        <img
          className={ styles['card-image'] }
          data-testid={ `${index}-card-img` }
          alt="foto"
          src={ thumbnail }
        />
        <span data-testid={ `${index}-card-name` }>
          { recipeName }
        </span>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  recipeData: PropTypes.shape({
    index: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    recipeName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeCard;
