import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from './artist-question-screen';

configure({
  adapter: new Adapter()
});

const questions = [{
  type: `artist`,
  song: {
    artist: `Rihanna`,
    src: `song src`
  },
  answers: [{
    picture: `first picture`,
    artist: `Rita Ora`
  }, {
    picture: `second picture`,
    artist: `Rihanna`
  }, {
    picture: `third picture`,
    artist: `Beyonce`
  }]
}];

const mockEvent = {
  preventDefault() {}
};

it(`should call onUserAnswer callback on answer input change`, () => {
  const userAnswer = {
    picture: `second picture`,
    artist: `Rihanna`
  };
  const onUserAnswer = jest.fn();
  const screen = shallow(
      <ArtistQuestionScreen
        question={questions[0]}
        onAnswer={onUserAnswer}
      />
  );
  screen.find(`input.artist__input`).at(1).simulate(`change`, mockEvent);
  expect(onUserAnswer).toHaveBeenCalledTimes(1);
  expect(onUserAnswer.mock.calls[0][0]).toMatchObject(questions[0]);
  expect(onUserAnswer.mock.calls[0][1]).toMatchObject(userAnswer);
});

