import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { inputWord, selectWord } from './searchSlice'

export function Searcher() {
  const [select_word, setText] = useState('');
  const test = useSelector(selectWord)
  const dispatch = useDispatch()

  const addTodoHandler = (event) => {
    event.preventDefault();
    dispatch(inputWord(select_word));
    // setText('');
  };

  return (
    <div>
      <div>
        <form>
            {/* <input type='text' value={select_word} onClick={(e) => setText(e.target.value)}/> */}
            {/* <input type='text' defaultValue={select_word} onChange={(e) => dispatch(inputWord(e.target.value))}/> */}
            <input type='text' defaultValue={select_word} onChange={(e) => setText(e.target.value)}/>
            <button onClick={() => dispatch(inputWord(select_word))}>
              search
            </button>
        </form>
        <p>{select_word}</p>
      </div>
    </div>
  );
}