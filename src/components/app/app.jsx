import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';

const welcomeButtonClickHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {errorsCount} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <WelcomeScreen
              errorsCount={errorsCount}
              onWelcomeButtonClick={welcomeButtonClickHandler}
            />
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreen />
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorsCount: PropTypes.number.isRequired
};

export default App;
