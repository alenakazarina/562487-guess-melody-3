import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

const welcomeButtonClickHandler = () => {};

const App = ({errorsCount}) => {
  return (
    <WelcomeScreen
      errorsCount={errorsCount}
      onWelcomeButtonClick={welcomeButtonClickHandler}
    />
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired
};

export default App;
