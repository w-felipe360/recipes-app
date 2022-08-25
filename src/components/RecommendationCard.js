import PropTypes from 'prop-types';
import React from 'react';
// import PropTypes from 'prop-types';

function RecommendationCard({ data, recipe, testidCard, testidTitle }) {
//   console.log(key);
  return (
    <div>
      {recipe === 'food' ? (
        <div data-testid={ testidCard }>
          <img
            src={ data.strMealThumb }
            alt={ data.strMeal }
            width="250px"
            height="150px"
          />
          <p>{data.strCategory}</p>
          <p data-testid={ testidTitle }>{data.strMeal}</p>
        </div>
      ) : (
        <div data-testid={ testidCard }>
          <img
            src={ data.strDrinkThumb }
            alt={ data.strDrink }
            width="250px"
            height="150px"
          />
          <p>{data.strAlcoholic}</p>
          <p data-testid={ testidTitle }>{data.strDrink}</p>
        </div>
      )}
    </div>
  );
}

RecommendationCard.propTypes = {
  data: PropTypes.shape({
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  recipe: PropTypes.string.isRequired,
  testidCard: PropTypes.string.isRequired,
  testidTitle: PropTypes.string.isRequired,
};

export default RecommendationCard;
