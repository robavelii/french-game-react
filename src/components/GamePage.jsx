/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWord,
  selectCurrentWord,
  selectIsCorrect,
  selectScore,
  selectTranslation,
  submitAnswer,
  fetchTranslation,
} from '../slices/wordsSlice';
import '../index.css';

function GamePage() {
  const dispatch = useDispatch();
  const currentWord = useSelector(selectCurrentWord);
  const isCorrect = useSelector(selectIsCorrect);
  const score = useSelector(selectScore);
  const translation = useSelector(selectTranslation);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    dispatch(fetchWord());
  }, []);

  const handleAnswer = () => {
    dispatch(submitAnswer(selected));
    setSelected('');
  };

  const handleTranslation = () => {
    dispatch(fetchTranslation(currentWord.word));
  };

  return (
    <div className='App'>
      <h1>French Word Game</h1>
      <p>
        <span onClick={handleTranslation}>{currentWord.word}</span>
      </p>
      {translation && (
        <div className='translation'>
          <p>{translation}</p>
        </div>
      )}
      <p>Select the correct article:</p>
      <div className='buttons'>
        <button
          className={selected === 'LE' ? 'selected' : ''}
          onClick={() => setSelected('LE')}
        >
          UN/LE
        </button>
        <button
          className={selected === 'LA' ? 'selected' : ''}
          onClick={() => setSelected('LA')}
        >
          UNE/LA
        </button>
      </div>
      <button disabled={!selected} onClick={handleAnswer}>
        Submit
      </button>
      {isCorrect !== null && (
        <div className={result + (isCorrect ? 'correct' : 'wrong')}>
          {isCorrect ? 'Correct!' : 'Wrong!'}
          {!isCorrect && (
            <span className='correct-answer'>
              The correct article{' '}
              <span className='correct-article'>
                {currentWord.gender === 'M' ? 'LE' : 'LA'}
              </span>{' '}
              {currentWord.word.endsWith('e') ? 'is' : 'begins with'}{' '}
              <span className='correct-ending'>
                {currentWord.word.endsWith('e') ? '' : '…'}
                {currentWord.word.slice(-2)}
              </span>
              .
            </span>
          )}
        </div>
      )}
      <p>Score: {score}</p>
    </div>
  );
}

export default GamePage;
