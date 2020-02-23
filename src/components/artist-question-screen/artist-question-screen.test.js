import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen';
import {questions} from '../../mocks/questions';

describe(`ArtistQuestionScreen`, () => {
  it(`should render ArtistQuestionScreen correctly`, () => {
    const tree = renderer.create(
        <ArtistQuestionScreen
          question={questions[1]}
          onAnswer={()=>{}}
          renderPlayer={()=>{}}
        />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
