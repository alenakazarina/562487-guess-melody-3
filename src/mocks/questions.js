import {QuestionType} from '../const';

const questions = [
  {
    type: QuestionType.GENRE,
    genre: `рэгги`,
    answers: [{
      src: `https://res.cloudinary.com/df6cuiopc/video/upload/v1581414459/music/track-08.mp3`,
      genre: `pop`,
    }, {
      src: `https://res.cloudinary.com/df6cuiopc/video/upload/v1581414459/music/track-07.mp3`,
      genre: `rnb`,
    }, {
      src: `https://res.cloudinary.com/df6cuiopc/video/upload/v1581414459/music/track-05.mp3`,
      genre: `dubstep`,
    }, {
      src: `https://res.cloudinary.com/df6cuiopc/video/upload/v1581414459/music/track-06.mp3`,
      genre: `reggae`
    }]
  },
  {
    type: QuestionType.ARTIST,
    song: {
      artist: `Rihanna`,
      src: `https://res.cloudinary.com/df6cuiopc/video/upload/v1581414089/music/track-04.mp3`,
    },
    answers: [{
      picture: `https://res.cloudinary.com/df6cuiopc/image/upload/v1581416516/avatars/artist-01.jpg`,
      artist: `Rita Ora`,
    }, {
      picture: `https://res.cloudinary.com/df6cuiopc/image/upload/v1581416516/avatars/artist-02.jpg`,
      artist: `Rihanna`,
    }, {
      picture: `https://res.cloudinary.com/df6cuiopc/image/upload/v1581416516/avatars/artist-03.jpg`,
      artist: `Beyonce`,
    }]
  }
];

export {questions, QuestionType};
