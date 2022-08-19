import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => {
  const history = useHistory();

  const redirectHistory = (param) => {
    history.push(param);
  };

  return (
    <div data-testid="footer">
      <button
        type="button"
        onClick={
          () => redirectHistory('/rotabebida')
        }
      >
        <img
          src={ drinkIcon }
          alt="drink-icon"
          data-testid="drinks-bottom-btn"
        />
      </button>
      Footer
      <button
        type="button"
        onClick={
          () => redirectHistory('/rotacomida')
        }
      >
        <img src={ mealIcon } alt="meal-icon" data-testid="food-bottom-btn" />
      </button>
    </div>
  );
};

export default Footer;
