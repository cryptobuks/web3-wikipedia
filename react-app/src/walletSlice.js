import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    word: null,
    provider: null,
    signer: null,
    daoInst: null,
    // if you add reducer,please add state
  },
  reducers: {
    // to do: you can change value to add reducer
    inputWord: (state, action) => {
      state.word = action.payload;
    },
    inputProvider: (state, action) => {
      state.provider = action.payload;
    },
    inputSigner: (state, action) => {
      state.signer = action.payload;
    },
    inputDaoInst: (state, action) => {
      state.daoInst = action.payload;
    },
  }
})

export const {inputWord, inputProvider, inputSigner, inputDaoInst} = walletSlice.actions
export const selectWord = (state) => state.searcher.word
export default walletSlice.reducer
