import React, {PureComponent} from 'react';
import {func} from 'prop-types';
import {genreQuestionPropTypes} from '../../types';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userAnswers: new Array(4).fill(false)
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const {question, onAnswer} = this.props;
    const {userAnswers} = this.state;
    onAnswer(question, userAnswers);
  }

  render() {
    const {question, renderPlayer} = this.props;
    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {question.genre} треки</h2>
        <form className="game__tracks"
          onSubmit={this._handleSubmit}
        >
          {question.answers.map((answer, i) => (
            <div className="track" key={`${answer.genre}${i}`}>
              {renderPlayer(answer.src, i)}
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox" name="answer"
                  value={`answer-${i}`}
                  id={`answer-${i}`}
                  onChange={(evt) => {
                    const {userAnswers} = this.state;
                    const {checked} = evt.target;
                    this.setState({
                      userAnswers: [...userAnswers.slice(0, i), checked, ...userAnswers.slice(i + 1)]
                    });
                  }}
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))}
          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  question: genreQuestionPropTypes,
  onAnswer: func.isRequired,
  renderPlayer: func.isRequired
};

export default GenreQuestionScreen;
