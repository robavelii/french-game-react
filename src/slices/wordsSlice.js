// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const baseUrl = 'http://localhost:5000/api/v1';

// //to test logic from the frontend
// const masculineEndings = ['age', 'aire', 'isme', 'ment', 'oir', 'sme', 'é'];
// const feminineEndings = [
//   'ade',
//   'ance',
//   'ence',
//   'ette',
//   'ie',
//   'ine',
//   'ion',
//   'ique',
//   'isse',
//   'ité',
//   'lle',
//   'ure',
// ];

// const initialState = {
//   word: null,
//   currentWordIndex: 0,
//   isCorrect: null,
//   score: 0,
//   correctArticle: null,
//   correctEnding: null,
//   translation: null,
// };

// export const wordsSlice = createSlice({
//   name: 'words',
//   initialState,
//   reducers: {
//     setWord: (state, action) => {
//       console.log('Action', action.payload);
//       state.word = action.payload.word;
//       state.currentWordIndex = action.payload.index;
//       state.isCorrect = null;
//       state.correctArticle = null;
//       state.correctEnding = null;
//       state.translation = null;
//     },
//     setCorrect: (state) => {
//       state.isCorrect = true;
//       state.score++;
//     },
//     setWrong: (state) => {
//       state.isCorrect = false;
//     },
//     setCorrectArticle: (state, action) => {
//       state.correctArticle = action.payload.article;
//       state.correctEnding = action.payload.ending;
//     },
//     setTranslation: (state, action) => {
//       state.translation = action.payload.translation_en;
//     },
//   },
// });

// const config = {
//   headers: {
//     Authorization: `Bearer ${
//       JSON.parse(localStorage.getItem('userInfo')).accessToken
//     }`,
//   },
// };

// export const fetchWord = () => async (dispatch) => {
//   try {
//     const response = await axios.get(`${baseUrl}/words/random`, config);
//     dispatch(setWord(response.data));
//     console.log('Inside fetch', response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const selectCurrentWord = (state) => state.word;
// export const selectIsCorrect = (state) => state.isCorrect;
// export const selectScore = (state) => state.score;
// export const selectTranslation = (state) => state.translation;

// export const submitAnswer = (selected) => (dispatch, getState) => {
//   const { word, gender } = selectCurrentWord(getState());
//   const isCorrect = selected === (gender === 'masculine' ? 'LE' : 'LA');
//   if (isCorrect) {
//     dispatch(setCorrect());
//   } else {
//     dispatch(setWrong());
//     let correctArticle = gender === 'masculine' ? 'LE' : 'LA';
//     let correctEnding = '';
//     for (let ending of gender === 'masculine'
//       ? masculineEndings
//       : feminineEndings) {
//       if (word.endsWith(ending)) {
//         correctEnding = ending;
//         break;
//       }
//     }
//     if (!correctEnding) {
//       correctEnding = word;
//     }
//     dispatch(
//       setCorrectArticle({ article: correctArticle, ending: correctEnding })
//     );
//   }
//   dispatch(fetchTranslation(word));
//   dispatch(nextWord());
// };

// export const fetchTranslation = (word) => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       `${baseUrl}/words/example?word=${word}`,
//       config
//     );
//     dispatch(setTranslation(response.data.example.translation_en));
//   } catch (error) {
//     console.error(error);
//   }
// };

// // actions
// export const {
//   setWord,
//   setCorrect,
//   setWrong,
//   setCorrectArticle,
//   setTranslation,
// } = wordsSlice.actions;

// // async thunks
// export const nextWord = () => (dispatch) => {
//   dispatch(fetchWord());
// };

// export default wordsSlice.reducer;
