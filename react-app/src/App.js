import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Component } from 'react';
import Home from "./pages/Home";
import ListView from "./pages/ListView";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import store from './store';
import { Provider } from 'react-redux';


export default class App extends Component {
    render() {
        return (
          <Provider store={store}>
              <BrowserRouter>
              <Routes>
                <Route path={`/`} element={<Home />} />
                <Route path={`/ListView/`} element={<ListView />} />
                <Route path={`/Edit`} element={<Edit />} />
                <Route path={`/Detail/`} element={<Detail />} />
              </Routes>
            </BrowserRouter>
            </Provider>
        );
    }
}