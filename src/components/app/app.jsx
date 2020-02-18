import React, {PureComponent} from 'react';
import {number, arrayOf, object} from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import GameScreen from '../game-screen/game-screen';
import {QuestionType} from '../../mocks/questions';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: -1
    };
    this._handleWelcomeButtomClick = this._handleWelcomeButtomClick.bind(this);
  }

  componentDidUpdate() {
    if (this.state.step >= this.props.questions.length) {
      this.setState(() => ({
        step: -1
      }));
    }
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
          <GameScreen type={QuestionType.GENRE}>
            <GenreQuestionScreen
              question={question}
              onAnswer={() => {
                this.setState((state) => ({
                  step: state.step + 1,
                }));
              }}
            />
          </GameScreen>
        );
      case QuestionType.ARTIST:
        return (
          <GameScreen type={QuestionType.ARTIST}>
            <ArtistQuestionScreen
              question={question}
              onAnswer={() => {
                this.setState((state) => ({
                  step: state.step + 1
                }));
              }}
            />
          </GameScreen>
        );
      default:
        return null;
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
            <GameScreen type={QuestionType.GENRE}>
              <GenreQuestionScreen
                question={questions[0]}
                onAnswer={() => {
                  this.setState(() => ({
                    step: 1
                  }));
                }}
              />
            </GameScreen>
          </Route>
          <Route exact path="/dev-artist">
            <GameScreen type={QuestionType.ARTIST}>
              <ArtistQuestionScreen
                question={questions[1]}
                onAnswer={() => {
                  this.setState(() => ({
                    step: 2
                  }));
                }}
              />
            </GameScreen>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  errorsCount: number.isRequired,
  questions: arrayOf(object).isRequired
};

export default App;
