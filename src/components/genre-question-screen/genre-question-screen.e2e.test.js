import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GenreQuestionScreen from './genre-question-screen';

configure({
  adapter: new Adapter()
});

const questions = [{
  type: `genre`,
  genre: `рэгги`,
  answers: [{
    src: `first src`,
    genre: `pop`,
  }, {
    src: `second src`,
    genre: `rnb`,
  }, {
    src: `third src`,
    genre: `dubstep`,
  }, {
    src: `fourth src`,
    genre: `reggae`
  }]
}];

const mockEvent = {
  preventDefault() {}
};

it(`should call preventDefault on submit form`, () => {
  const onUserAnswer = jest.fn();
  const preventDefaultSubmit = jest.fn();
  const screen = shallow(
      <GenreQuestionScreen
        question={questions[0]}
        onAnswer={onUserAnswer}
      />
  );
  const form = screen.find(`form.game__tracks`);
  form.simulate(`submit`, {preventDefault: preventDefaultSubmit});
  expect(preventDefaultSubmit).toHaveBeenCalledTimes(1);
  expect(onUserAnswer).toHaveBeenCalledTimes(1);
});

it(`should call onAnswer cb with question and checked answers as arguments`, () => {
  const userAnswers = [true, false, false, false];
  const onUserAnswer = jest.fn();
  const screen = shallow(
      <GenreQuestionScreen
        question={questions[0]}
        onAnswer={onUserAnswer}
      />
  );
  const input = screen.find(`input.game__input`).at(0);
  input.simulate(`change`, {target: {checked: true}});
  screen.find(`form.game__tracks`).simulate(`submit`, mockEvent);
  expect(onUserAnswer.mock.calls[0][0]).toMatchObject(questions[0]);
  expect(onUserAnswer.mock.calls[0][1]).toMatchObject(userAnswers);
});
