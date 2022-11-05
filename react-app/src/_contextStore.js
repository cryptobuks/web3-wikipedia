import React, { createContext } from 'react'

const initialState = {
  currentAccount: "",
}

export const Context = createContext(initialState) // <- initialStateを使ってContextを作成

export const Store = ({ children }) => {
  return (
    <Context.Provider value={[initialState]}> {/* <- valueに渡したものがGlobal stateに */} 
      {children}
    </Context.Provider>
  )
}
