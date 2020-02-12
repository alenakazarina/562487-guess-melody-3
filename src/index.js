import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {questions} from './mocks/questions';
import {ERRORS_COUNT} from './const';

ReactDOM.render(<App errorsCount={ERRORS_COUNT} questions={questions} />, document.querySelector(`#root`));
