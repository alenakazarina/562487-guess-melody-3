import React, {PureComponent} from 'react';
import {func} from 'prop-types';
import {artistQuestionPropTypes} from '../../types';
import {PAUSE_CLASS} from '../../const';

class ArtistQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
  }

  componentDidUpdate() {
    const {isPlaying} = this.state;
    const activeAudio = document.querySelector(`.game__screen audio`);
    if (isPlaying) {
      activeAudio.play();
    } else {
      activeAudio.pause();
    }
  }

  _handlePlayButtonClick(evt) {
    evt.target.classList.toggle(PAUSE_CLASS);
    this.setState((state) => ({
      isPlaying: !state.isPlaying
    }));
  }

  render() {
    const {question, onAnswer} = this.props;
    const {song, answers} = question;

    return (
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <button
              className="track__button track__button--play"
              type="button"
              onClick={this._handlePlayButtonClick}
            ></button>
            <div className="track__status">
              <audio src={song.src}></audio>
            </div>
          </div>
        </div>

        <form className="game__artist">
          {answers.map((answer, i) => (
            <div className="artist" key={answer.artist}>
              <input
                className="artist__input visually-hidden"
                type="radio" name="answer"
                value={`artist-${i}`}
                id={`answer-${i}`}
                onChange={(evt) => {
                  evt.preventDefault();
                  onAnswer(question, answer);
                }}
              />
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                {answer.artist}
              </label>
            </div>
          ))}
        </form>
      </section>
    );
  }
}

ArtistQuestionScreen.propTypes = {
  question: artistQuestionPropTypes,
  onAnswer: func.isRequired
};

export default ArtistQuestionScreen;
