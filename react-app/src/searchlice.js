import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'searcher',
  initialState: {
    word: "test"
  },
  reducers: {
    inputWord: (state, action) => {
      state.word += action.payload
    }
  }
})

export const inputWord = searchSlice.actions
export const selectWord = (state) => state.searcher.word
export default searchSlice.reducer