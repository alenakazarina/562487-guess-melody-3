import React from 'react';
import renderer from 'react-test-renderer';
import GameScreen from './game-screen';
import {QuestionType} from '../../const';

const gameScreenChildren = <div>Game screen children</div>;

describe(`GameScreen`, () => {
  it(`should render GameScreen with genre type`, () => {
    const tree = renderer.create(
        <GameScreen type={QuestionType.GENRE}>
          {gameScreenChildren}
        </GameScreen>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`should render GameScreen with artist type`, () => {
    const tree = renderer.create(
        <GameScreen type={QuestionType.ARTIST}>
          {gameScreenChildren}
        </GameScreen>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
