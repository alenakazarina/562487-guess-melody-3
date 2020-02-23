import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player';

const src = `audio-src`;

describe(`AudioPlayer`, () => {
  it(`should render AudioPlayer correctly`, () =>{
    const tree = renderer.create(
        <AudioPlayer
          src={src}
          isPlaying={true}
          onPlayButtonClick={()=>{}}
        />,
        {createNodeMock: () => document.createElement(`audio`)}
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
