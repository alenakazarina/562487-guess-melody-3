import {shape, oneOf, string, arrayOf} from 'prop-types';
import {QuestionType} from './const';

export const genreQuestionPropTypes = shape({
  type: oneOf(Object.values(QuestionType)),
  genre: string.isRequired,
  answers: arrayOf(shape({
    src: string.isRequired,
    genre: string.isRequired
  })).isRequired
});

export const artistQuestionPropTypes = shape({
  type: oneOf(Object.values(QuestionType)),
  song: shape({
    artist: string.isRequired,
    src: string.isRequired
  }),
  answers: arrayOf(shape({
    picture: string.isRequired,
    artist: string.isRequired
  })).isRequired
}).isRequired;
