import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import styles from './DoneRecipeCard.module.css';
import favoriteIcon from '../images/blackHeartIcon.svg';
import { removeFavoriteRecipe } from '../helpers/localStorage';

function FavoriteRecipeCard({ data, index, filterData }) {
  const [isCopied, setIsCopied] = useState(false);
  const { id, type, nationality, category, alcoholicOrNot, name, image } = data;

  const hrefToDetails = () => {
    const { origin } = window.location;
    return `${origin}/${type}s/${id}`;
  };

  const handleCopyClick = () => {
    setIsCopied(true);
    const contentToCopy = hrefToDetails();
    clipboardCopy(contentToCopy);
  };

  const handleFoodFilter = () => {
    const { setFoodFilter, setNoFilter } = filterData;
    const updatedData = removeFavoriteRecipe(id);
    const updatedFilteredData = updatedData
      .filter((localStorageData) => localStorageData.type === 'food');
    setFoodFilter(updatedFilteredData);
    setNoFilter(updatedData);
  };

  const handleDrinkFilter = () => {
    const { setDrinkFilter, setNoFilter } = filterData;
    const updatedData = removeFavoriteRecipe(id);
    const updatedFilteredData = updatedData
      .filter((localStorageData) => localStorageData.type === 'drink');
    setDrinkFilter(updatedFilteredData);
    setNoFilter(updatedData);
  };

  const handleRemoveFavoriteClick = () => {
    const { setNoFilter, whichFilterToApply } = filterData;
    const updatedData = removeFavoriteRecipe(id);
    if (whichFilterToApply === 'noFilter') { setNoFilter(updatedData); }
    if (whichFilterToApply === 'food') { handleFoodFilter(); }
    if (whichFilterToApply === 'drink') { handleDrinkFilter(); }
  };

  const topText = `${alcoholicOrNot || nationality} - ${category}`;

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          alt="foobar"
          src={ image }
          data-testid={ `${index}-horizontal-image` }
          className={ styles.image }
        />
      </Link>
      <div>
        <div>
          <h5 data-testid={ `${index}-horizontal-top-text` }>
            { topText }
          </h5>
        </div>
        <Link to={ `/${type}s/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>
            { name }
          </h4>
        </Link>
        { isCopied && <span>Link copied!</span> }
        <button
          type="button"
          onClick={ () => handleCopyClick() }
        >
          <img
            alt="shareButton"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        <button
          type="button"
          onClick={ () => handleRemoveFavoriteClick() }
        >
          <img
            alt="favorite button"
            src={ favoriteIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  filterData: PropTypes.shape({
    setNoFilter: PropTypes.func.isRequired,
    setFoodFilter: PropTypes.func.isRequired,
    setDrinkFilter: PropTypes.func.isRequired,
    whichFilterToApply: PropTypes.string.isRequired,
  }).isRequired,
};

export default FavoriteRecipeCard;
