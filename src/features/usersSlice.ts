import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { today, AppSelector, selector } from '../utils';
import { v4 } from "uuid"
import * as R from "ramda"

type Rights
  = "user"
  | "admin"

export type User = {
  login: string,
  password: string,
  right: Rights,
  id: string
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [
      { login: "Senator", 
        password: "it_has_to_be_this_way",
        right: "admin", 
        id: v4()
      },
      { login: "Sundowner",
        password: "Red_Sun",
        right: "user",
        id: v4()
      },
      { login: "1",
        password: "1",
        right: "admin",
        id: v4()
      },
    ] as User[],
  },
  reducers: {
    login: (state, action: PayloadAction<{login: string, password: string}>) => {
      R.map(user => 
        user.login    === action.payload.login &&
        user.password === action.payload.password 
          ? ( localStorage.setItem("_login", action.payload.login),
              localStorage.setItem("_password", action.payload.login)
            )
            
          : {}
        ,
        state.users
      )
    },
    logout: (state) => localStorage.clear(),
  }
})

export const selectUsers: AppSelector<{users: User[]}> = selector(state => state.users)

export const { login, logout } = usersSlice.actions