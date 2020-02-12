import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';
import {questions} from '../../mocks/questions';

it(`should render App`, () => {
  const tree = renderer.create(
      <App
        errorsCount={3}
        questions={questions}
      />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
