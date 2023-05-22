/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import axios from '../api/api';

const initialState = {
  word: null,
  nounList: {
    masculine: [],
    feminine: [],
  },
  isCorrect: null,
  score: 0,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setWord: (state, action) => {
      state.word = action.payload;
      state.isCorrect = null;
    },
    setNouns: (state, action) => {
      state.nounList = action.payload;
    },
    setCorrect: (state) => {
      state.isCorrect = true;
      state.score++;
    },
    setWrong: (state) => {
      state.isCorrect = false;
    },
    setTranslation: (state, action) => {
      state.translation = action.payload;
    },
    setCorrectArticle: (state, action) => {
      state.correctArticle = action.payload.article;
      state.correctEnding = action.payload.ending;
    },
  },
});

export const {
  setWord,
  setNouns,
  setCorrect,
  setWrong,
  setTranslation,
  setCorrectArticle,
} = wordsSlice.actions;

export const selectWord = (state) => state.words.word;
export const selectNouns = (state) => state.words.nounList;
export const selectIsCorrect = (state) => state.words.isCorrect;
export const selectScore = (state) => state.words.score;
export const selectTranslation = (state) => state.words.translation;

const config = {
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem('userInfo')).accessToken
    }`,
  },
};

export const fetchWord = () => async (dispatch) => {
  try {
    const response = await axios.get('/words/random', config);
    dispatch(setWord(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const fetchNouns = () => async (dispatch) => {
  try {
    const [masculineResponse, feminineResponse] = await Promise.all([
      axios.get('/words/masculine', config),
      axios.get('/words/feminine', config),
    ]);
    console.log(masculineResponse.data, feminineResponse.data);
    dispatch(
      setNouns({
        masculine: masculineResponse.data,
        feminine: feminineResponse.data,
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const fetchTranslation = (word) => async (dispatch) => {
  try {
    const response = await axios.get(`/words/example?word=${word}`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// export const submitAnswer = (selected) => (dispatch, getState) => {
//   const word = selectWord(getState());
//   const isCorrect = selected === (word.gender === 'm' ? 'UN/LE' : 'UNE/LA');
//   if (isCorrect) {
//     dispatch(setCorrect());
//   } else {
//     dispatch(setWrong());
//   }
// };
export const submitAnswer = (selected) => async (dispatch, getState) => {
  const { word, gender } = selectWord(getState());
  const isCorrect = selected === (word.gender === 'm' ? 'UN/LE' : 'UNE/LA');
  if (isCorrect) {
    dispatch(setCorrect());
    const translation = await dispatch(fetchTranslation(word.word));
    console.log(translation);
  } else {
    dispatch(setWrong());
    let correctArticle = gender === 'masculine' ? 'LE' : 'LA';
    let correctEnding = '';
    for (let ending of gender === 'masculine'
      ? selectNouns(getState()).masculine
      : selectNouns(getState()).feminine) {
      if (word.word.endsWith(ending)) {
        correctEnding = ending;
        break;
      }
    }
    if (!correctEnding) {
      correctEnding = word.word;
    }
    dispatch(
      setCorrectArticle({ article: correctArticle, ending: correctEnding })
    );
  }
  dispatch(fetchTranslation(word.word));
  dispatch(nextWord());
};

export const nextWord = () => (dispatch) => {
  dispatch(fetchWord());
};

export default wordsSlice.reducer;
