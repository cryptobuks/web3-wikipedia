import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { inputWord, selectWord } from './searchSlice'

export function Searcher() {
//   const [select_word, setText] = useState('');
  const test = useSelector(selectWord)
  const dispatch = useDispatch()

//   const addTodoHandler = (event) => {
//     event.preventDefault();
//     dispatch(inputWord(select_word));
//     setText('');
//   };

  return (
    <div>
      <div>
        <form onSubmit={addTodoHandler}>
            {/* <input type='text' value={select_word} onClick={(e) => setText(e.target.value)}/> */}
            <input type='text' value={select_word} onClick={(e) => dispatch(inputWord(e.target.value))}/>
            <button>search</button>
        </form>
        <p>{test}</p>
      </div>
    </div>
  );
}