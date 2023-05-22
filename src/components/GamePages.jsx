/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api';
import {
  fetchNouns,
  fetchTranslation,
  fetchWord,
  selectIsCorrect,
  selectNouns,
  selectScore,
  selectWord,
  submitAnswer,
} from '../slices/wordSlice';

function GamePages() {
  const dispatch = useDispatch();
  const word = useSelector(selectWord);
  const nouns = useSelector(selectNouns);
  const isCorrect = useSelector(selectIsCorrect);
  const score = useSelector(selectScore);
  const [selected, setSelected] = useState('');
  const [translation, setTranslation] = useState('');

  useEffect(() => {
    dispatch(fetchWord());
    dispatch(fetchNouns());
  }, [dispatch]);

  useEffect(() => {
    const fetchTranslationPromise = async () => {
      const response = await dispatch(fetchTranslation());
      setTranslation(response);
    };
    if (word) {
      fetchTranslationPromise();
    }
  }, [dispatch, word]);

  const handleAnswer = () => {
    dispatch(submitAnswer(selected));
    setSelected('');
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <h1>French Gender Learning Game</h1>
          <h2>Score: {score}</h2>
          <div className='card'>
            <div className='card-body'>
              <h3>
                {word && word.word}
                {translation.length > 0 && (
                  <small className='text-muted ml-2'>({translation})</small>
                )}
              </h3>
              <div className='form-check'>
                <input
                  type='radio'
                  id='un-le'
                  name='article-group'
                  value='UN/LE'
                  className='form-check-input'
                  checked={selected === 'UN/LE'}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label htmlFor='un-le' className='form-check-label'>
                  {nouns.masculine.map((m) => m.ending).join(', ')}
                </label>
              </div>
              <div className='form-check'>
                <input
                  type='radio'
                  id='une-la'
                  name='article-group'
                  value='UNE/LA'
                  className='form-check-input'
                  checked={selected === 'UNE/LA'}
                  onChange={(e) => setSelected(e.target.value)}
                />
                <label htmlFor='une-la' className='form-check-label'>
                  {nouns.feminine.map((m) => m.ending).join(', ')}
                </label>
              </div>
              <button
                className='btn btn-primary'
                disabled={!selected}
                onClick={handleAnswer}
              >
                Submit
              </button>
              <p className='mt-2'>
                {isCorrect !== null && (isCorrect ? 'Correct!' : 'Wrong!')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePages;
