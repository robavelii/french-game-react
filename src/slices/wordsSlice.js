/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = 'http:localhost:5000/api/v1';
const masculineEndings = ['age', 'aire', 'isme', 'ment', 'oir', 'sme', 'é'];
const feminineEndings = [
  'ade',
  'ance',
  'ence',
  'ette',
  'ie',
  'ine',
  'ion',
  'ique',
  'isse',
  'ité',
  'lle',
  'ure',
];

const initialState = {
  words: [],
  currentWordIndex: 0,
  isCorrect: null,
  score: 0,
  correctArticle: null,
  correctEnding: null,
  translation: null,
};
export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWords: (state, action) => {
      Object.assign(state, initialState, { words: action.payload });
    },
    nextWord: (state) => {
      state.currentWordIndex++;
      state.isCorrect = null;
      state.correctArticle = null;
      state.correctEnding = null;
      state.translation = null;
    },
    setCorrect: (state) => {
      state.isCorrect = true;
      state.score++;
    },
    setWrong: (state) => {
      state.isCorrect = false;
    },
    setCorrectArticle: (state, action) => {
      state.correctArticle = action.payload.article;
      state.correctEnding = action.payload.ending;
    },
    setTranslation: (state, action) => {
      state.translation = action.payload;
    },
  },
});

export const fetchWords = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/words/random`);
    console.log(response.data);
    dispatch(setWords(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const selectCurrentWord = (state) => state.words.word[state.words.word];
export const selectIsCorrect = (state) => state.words.isCorrect;
export const selectScore = (state) => state.words.score;
export const selectTranslation = (state) => state.words.translation;

export const submitAnswer = (selected) => (dispatch, getState) => {
  const { word, gender } = selectCurrentWord(getState());
  const isCorrect = selected === (gender === 'masculine' ? 'LE' : 'LA');
  if (isCorrect) {
    dispatch(setCorrect());
  } else {
    dispatch(setWrong());
    let correctArticle = gender === 'masculine' ? 'LE' : 'LA';
    let correctEnding = '';
    for (let ending of gender === 'masculine'
      ? masculineEndings
      : feminineEndings) {
      if (word.endsWith(ending)) {
        correctEnding = ending;
        break;
      }
    }
    if (!correctEnding) {
      correctEnding = word;
    }
    dispatch(setCorrectArticle(correctArticle, correctEnding));
  }
  dispatch(fetchTranslation(word));
  dispatch(nextWord());
};

export const setCorrectArticle = (article, ending) => (dispatch) => {
  dispatch({ type: 'words/setCorrectArticle', payload: { article, ending } });
};

export const fetchTranslation = (word) => async (dispatch) => {
  try {
    const response = await axios.get(`/words/example?${word}`);
    dispatch(setTranslation(response.data.example.translation_en));
  } catch (error) {
    console.error(error);
  }
};

export const { setWords, nextWord, setCorrect, setWrong } = wordsSlice.actions;
