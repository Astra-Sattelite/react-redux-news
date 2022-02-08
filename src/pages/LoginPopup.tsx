import React, { useState } from 'react';
import ReactDOM from "react-dom"
import { useDispatch } from 'react-redux';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { login, logout } from "../features/usersSlice"
import "./LoginPopup.scss"
 
export const LoginPopup = () => {

  const [isPopupShown, setIsPopupShown] = useState(false)

  const [login_, setLogin] = useState("")

  const [password_, setPassword] = useState("")

  const dispatch = useDispatch()

  return (
    <div className="LoginPopupPage">
      <div className="LoginPopupButton" onClick={() => setIsPopupShown(true)}>Вход/Выход</div>
      { isPopupShown
          ? <div className="LoginPopupPageWrapper">
              <form className="LoginPopup"
                onSubmit={(e) => {
                  e.preventDefault()
                  dispatch(login({login: login_, password: password_}))
                  if ((localStorage.getItem("_login")?.length || 0) > 0) {
                    setIsPopupShown(false)
                  }
                }}
              >
                <label>Login</label>
                <input type="text" placeholder='Login' onChange={e => setLogin(e.target.value)}/>

                <label>Password</label>
                <input type="text" placeholder='Password' onChange={e => setPassword(e.target.value)}/>

                <button type="submit">Вход</button>

                <button type="button"
                  onClick={() => {
                    dispatch(logout())
                    setIsPopupShown(false)
                }}>Выход</button>
              </form>
            </div>
          : <></>
      }
    </div>
  )
}
