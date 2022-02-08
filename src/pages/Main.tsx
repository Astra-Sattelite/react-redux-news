import React from 'react';
import * as D from "date-fns"
import { useSelector, useDispatch } from 'react-redux';
import "./Main.scss"

export const Main = () => {

  const isLoginEmpty = localStorage.getItem("_login")?.length || 0

  const isUserAuthorized = isLoginEmpty > 0

  return (
    <div className="MainPage">
      { isUserAuthorized
        ? "Привет " + localStorage.getItem("_login")
        : "Привет, Гость"
      }
    </div>
  )
};
