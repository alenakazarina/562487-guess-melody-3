import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import {QuestionType} from '../../mocks/questions';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: -1
    };
    this._handleWelcomeButtomClick = this._handleWelcomeButtomClick.bind(this);
  }

  _handleWelcomeButtomClick() {
    this.setState((state) => ({
      step: state.step + 1
    }));
  }

  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={this._handleWelcomeButtomClick}
        />
      );
    }

    const question = questions[step];
    switch (question.type) {
      case QuestionType.GENRE:
        return (
          <GenreQuestionScreen
            question={question}
            onAnswer={() => {
              this.setState((state) => ({
                step: state.step + 1,
              }));
            }}
          />
        );
      case QuestionType.ARTIST:
        return (
          <ArtistQuestionScreen
            question={question}
            onAnswer={() => {
              this.setState((state) => ({
                step: state.step + 1
              }));
            }}
          />
        );
      default:
        return null;
    }
  }

  componentDidUpdate() {
    if (this.state.step >= this.props.questions.length) {
      this.setState(() => ({
        step: -1
      }));
    }
  }

  render() {
    const {questions} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/dev-genre">
            <GenreQuestionScreen
              question={questions[0]}
              onAnswer={() => {
                this.setState(() => ({
                  step: 1
                }));
              }}
            />
          </Route>
          <Route exact path="/dev-artist">
            <ArtistQuestionScreen
              question={questions[1]}
              onAnswer={() => {
                this.setState(() => ({
                  step: 2
                }));
              }}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default App;
