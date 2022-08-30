import React from 'react';
import PropTypes from 'prop-types';

function RecommendationCard2({ data, index }) {
  const alcoholicOrNot = data.strAlcoholic || data.strArea;
  const thumb = data.strMealThumb || data.strDrinkThumb;
  const name = data.strMeal || data.strDrink;
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <img
        src={ thumb }
        alt={ name }
        width="250px"
        height="150px"
      />
      <p>{alcoholicOrNot}</p>
      <p data-testid={ `${index}-recomendation-title` }>{name}</p>
    </div>
  );
}

RecommendationCard2.propTypes = {
  data: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strArea: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecommendationCard2;
