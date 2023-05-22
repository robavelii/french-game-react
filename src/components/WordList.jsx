/* eslint-disable react/prop-types */
const WordList = ({ words }) => {
  return (
    <ul>
      {words.map((word) => (
        <li key={word.id}>{word.word}</li>
      ))}
    </ul>
  );
};

export default WordList;
