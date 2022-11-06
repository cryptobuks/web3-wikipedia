import { BrowserRouter, Routes, Route} from "react-router-dom";
import React, { Component, createContext } from 'react';
import Home from "./pages/Home";
import ListView from "./pages/ListView";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Modify from "./pages/Modify";
import { Provider } from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import './App.css';
import store from './store';
// import { Store } from "./contextStore";
import IpfsTest from "./components/ipfs/IpfsTest";

let persistor = persistStore(store);

const App = () => {
  return (
    <React.StrictMode>
     <Provider store={store}>
      <PersistGate loading = {null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path={`/`} element={<Home />} />
            <Route path={`/listview/`} element={<ListView />} />
            <Route path={`/create`} element={<Create />} />
            <Route path={`/nodify`} element={<Modify />} />
            <Route path={`/detail/`} element={<Detail />} />
            <Route path={`/ipfs/`} element={<IpfsTest />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
     </Provider>
    </React.StrictMode>
  );
};


export default App;
