import React, {PureComponent, createRef} from 'react';
import {string, bool, func} from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._audioRef = createRef();
    this.state = {
      isLoading: true,
      isPlaying: props.isPlaying,
      progress: 0
    };
  }

  componentDidMount() {
    const audio = this._audioRef.current;
    audio.src = this.props.src;

    audio.oncanplaythrough = () => this.setState({
      isLoading: false
    });

    audio.onplay = () => this.setState({
      isPlaying: true
    });

    audio.onpause = () => this.setState({
      isPlaying: false
    });

    audio.ontimeupdate = () => this.setState({
      progress: audio.currentTime
    });
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;
    const {isPlaying} = this.props;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;
    audio.src = ``;
    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
  }

  render() {
    const {isLoading, isPlaying} = this.state;
    const {onPlayButtonClick} = this.props;
    return (
      <>
        <button type="button"
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          disabled={isLoading}
          onClick={() => {
            this.setState({
              isPlaying: !this.state.isPlaying
            });
            onPlayButtonClick();
          }}
        />
        <div className="track__status">
          <audio ref={this._audioRef} />
        </div>
      </>
    );
  }
}

AudioPlayer.propTypes = {
  src: string.isRequired,
  isPlaying: bool.isRequired,
  onPlayButtonClick: func.isRequired
};

export default AudioPlayer;
