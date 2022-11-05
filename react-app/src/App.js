import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';
import Home from "./pages/Home";
import ListView from "./pages/ListView";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import IpfsTest from "./components/ipfs/IpfsTest";


const App = () => {
  return (
    // <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/ListView/`} element={<ListView />} />
          <Route path={`/Edit`} element={<Edit />} />
          <Route path={`/Detail/`} element={<Detail />} />
          <Route path={`/Ipfs/`} element={<IpfsTest />} />
        </Routes>
      </BrowserRouter>
    // </Provider>
  );
};


export default App;
