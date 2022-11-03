import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListView from "./pages/ListView";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/ListView/`} element={<ListView />} />
        <Route path={`/Edit/`} element={<Edit />} />
        <Route path={`/Detail/`} element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
