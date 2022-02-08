import React from "react";
import "./App.scss";
import { Main } from "./pages/Main"
import { Routes, Route, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { LoginPopup } from './pages/LoginPopup';
import { News } from './pages/News';
import * as R from "ramda"


export const Header = () => {

  const buttons = [
    ["Вход/Выход", "/auth"],
    ["Новости", "/news"]
  ]

  return (
    <div className="Header">
      <Link to="/">
        <div className="HeaderLogo">
        </div>
      </Link>
      { R.map(([text, url]) =>
        <Link to={url} key={text} className="HeaderButton">
          {text}
        </Link>, buttons
      )}
    </div>
  )
};

const App = () => {


  return (
    <div className="AppMain">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<LoginPopup />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </div>
  );
}

export default App