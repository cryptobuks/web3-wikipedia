import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';
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
          <Route path={`/ListView/`} element={<ListView />} />
          <Route path={`/Create`} element={<Create />} />
          <Route path={`/Modify`} element={<Modify />} />
          <Route path={`/Detail/`} element={<Detail />} />
          <Route path={`/Ipfs/`} element={<IpfsTest />} />
        </Routes>
      </BrowserRouter>
      </PersistGate>
     </Provider>
    </React.StrictMode>
  );
};


export default App;
