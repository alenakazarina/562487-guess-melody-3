import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from './audio-player';

configure({
  adapter: new Adapter()
});

const src = `audio-src`;

it(`should play button be pressed`, () => {
  const onPlayButtonClick = jest.fn();
  const audioPlayer = shallow(
      <AudioPlayer
        src={src}
        isPlaying={false}
        onPlayButtonClick={onPlayButtonClick}
      />,
      {disableLifecycleMethods: true}
  );

  audioPlayer.setState({isLoading: false});
  const playButton = audioPlayer.find(`.track__button--play`);
  expect(playButton.props().disabled).toBe(false);
  playButton.simulate(`click`);
  expect(audioPlayer.find(`.track__button--pause`).props().className).toBe(`track__button track__button--pause`);
});
