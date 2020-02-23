import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from './genre-question-screen';
import {questions} from '../../mocks/questions';

describe(`GenreQuestionScreen`, () => {
  it(`should render GenreQuestionScreen correctly`, () => {
    const tree = renderer.create(
        <GenreQuestionScreen
          question={questions[0]}
          onAnswer={()=>{}}
          renderPlayer={()=>{}}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
