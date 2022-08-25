import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';

const Profile = () => {
  const history = useHistory();

  const redirectHistory = (param) => {
    history.push(param);
  };

  const redirectLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <br />
      {/* Resgatar email do local storage e mostrar nesse h2 */}
      <h2 data-testid="profile-email">Email</h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={
          () => redirectHistory('/receitas-feitas')
        }
      >
        Done Recipes

      </button>
      <br />
      <br />
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={
          () => redirectHistory('/receitas-favoritas')
        }
      >
        Favorite Recipes

      </button>
      <br />
      <br />
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={
          () => redirectLogout()
        }
      >
        Logout

      </button>
      <br />
      <br />
      <Footer />

    </div>
  );
};

export default Profile;
