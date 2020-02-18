import React, {PureComponent} from 'react';
import {func} from 'prop-types';
import {genreQuestionPropTypes} from '../../types';
import {PAUSE_CLASS} from '../../const';

class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      trackId: -1,
      isPlaying: false,
      userAnswers: new Array(4).fill(false)
    };
    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    this._handleUserAnswerChange = this._handleUserAnswerChange.bind(this);
  }

  componentDidUpdate() {
    const {trackId, isPlaying} = this.state;
    const activeAudio = document.querySelectorAll(`.game__screen audio`)[trackId];

    //  if updates from _handleUserAnswerChange
    if (!activeAudio) {
      return;
    }
    //  if updates after _handlePlayButtonClick
    if (isPlaying) {
      activeAudio.play();
    } else {
      activeAudio.pause();
    }
  }

  _handlePlayButtonClick(evt, id) {
    evt.target.classList.toggle(PAUSE_CLASS);
    const {trackId, isPlaying} = this.state;

    //  if first-time or the same
    if (trackId === id || trackId === -1) {
      this.setState((state) => ({
        trackId: id,
        isPlaying: !state.isPlaying,
      }));
      return;
    }

    //  if other from list
    const prevAudio = document.querySelectorAll(`.game__screen audio`)[trackId];
    prevAudio.currentTime = 0;
    prevAudio.pause();

    if (isPlaying) {
      document.querySelectorAll(`.track__button`)[trackId].classList.toggle(PAUSE_CLASS);
    }

    this.setState(() => ({
      trackId: id,
      isPlaying: true
    }));
  }

  _handleUserAnswerChange(userAnswer, index) {
    this.setState((state) => ({
      userAnswers: [...state.userAnswers.slice(0, index), userAnswer, ...state.userAnswers.slice(index + 1)]
    }));
  }

  render() {
    const {question, onAnswer} = this.props;
    const {userAnswers} = this.state;

    return (
      <section className="game__screen">
        <h2 className="game__title">Выберите {question.genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer(question, userAnswers);
          }}
        >
          {question.answers.map((answer, i) => (
            <div className="track" key={answer.genre}>
              <button
                className="track__button track__button--play"
                type="button"
                onClick={(evt) => this._handlePlayButtonClick(evt, i)}
              ></button>
              <div className="track__status">
                <audio src={answer.src}></audio>
              </div>
              <div className="game__answer">
                <input
                  className="game__input visually-hidden"
                  type="checkbox" name="answer"
                  value={`answer-${i}`}
                  id={`answer-${i}`}
                  checked={userAnswers[i]}
                  onChange={(evt) => this._handleUserAnswerChange(evt.target.checked, i)}
                />
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>
          ))}
          <button
            className="game__submit button"
            type="submit"
          >Ответить</button>
        </form>
      </section>
    );
  }
}

GenreQuestionScreen.propTypes = {
  question: genreQuestionPropTypes,
  onAnswer: func.isRequired
};

export default GenreQuestionScreen;
