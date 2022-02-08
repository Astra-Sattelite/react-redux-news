import { useSelector } from 'react-redux';
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { today, AppSelector, selector } from '../utils';
import * as D from "date-fns"
import { v4 } from "uuid"
import * as R from "ramda"
import { selectUsers, User } from "./usersSlice"
import { use } from "../utils"

const hugeText = "Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?Lorem ipsum?"

export type Status = "pending" | "approved"

export type News = {
  title: string,
  text: string,
  date: string,
  userId: string,
  id: string,
  status: Status
}

export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    pendingNews: [
      { title: "News With Explicit Content",
        text: hugeText,
        date: (new Date(),'04.02.2021'),
        userId: "",
        id: v4(),
        status: "pending" as Status
      },
      { title: "News With Explicit Content",
        text: hugeText,
        date: (new Date(),'04.02.2021'),
        userId: "",
        id: v4(),
        status: "pending" as Status
      },
      { title: "News With Explicit Content",
        text: hugeText,
        date: (new Date(),'04.02.2021'),
        userId: "",
        id: v4(),
        status: "pending" as Status
      },
      { title: "News With Explicit Content",
        text: hugeText,
        date: (new Date(),'04.02.2021'),
        userId: "",
        id: v4(),
        status: "pending" as Status
      },
      
    ],
    approvedNews: [
      { title: "Some Random News",
        text: hugeText,
        date: (new Date(),'04.02.2021'),
        userId: "",
        id: v4(),
        status: "approved" as Status
      },
      { title: "Title to Check Sort",
        text: hugeText,
        date: (new Date(),'02.02.2021'),
        userId: "",
        id: v4(),
        status: "approved" as Status
      },
      { title: "Some Random News",
        text: hugeText,
        date: (new Date(),'04.02.2021'),
        userId: "",
        id: v4(),
        status: "approved" as Status
      },
      { title: "Some Random News",
        text: "text to check Sort",
        date: (new Date(),'01.03.2021'),
        userId: "",
        id: v4(),
        status: "approved" as Status
      },
      { title: "Some Random News",
        text: "text to check Sort",
        date: (new Date(),'01.01.2022'),
        userId: "",
        id: v4(),
        status: "approved" as Status
      },
      { title: "Some Random News",
        text: "text to check Sort",
        date: (new Date(),'01.01.2022'),
        userId: "",
        id: v4(),
        status: "approved" as Status
      },
    ] as News[]
  },
  reducers: {
    addApprovedNews: (state, action: PayloadAction<{newsId: string, login: string, password: string, users: User[]}>) => {
      const isUserAdmin = 
        R.find(user =>
          user.login === action.payload.login && 
          user.password === action.payload.password &&
          user.right === "admin"
          , action.payload.users
        )
      isUserAdmin 
        ? state.approvedNews =
            R.concat(
              state.approvedNews,
              R.map((x: News) => ({title: x.title, text: x.text, date: x.date, userId: x.userId, id: x.id, status: "approved"}),
                R.filter(news =>
                  news.id === action.payload.newsId,
                  state.pendingNews
                )
              )
            )
        : {}
    },
    addPendingNews: (state, action: PayloadAction<News>) => {
      state.pendingNews = R.concat(state.pendingNews, [action.payload])
    },
    deleteNews: (state, action: PayloadAction<{newsId: string, login: string, password: string, users: User[]}>) => {
      R.find(user =>
        user.login === action.payload.login && 
        user.password === action.payload.password &&
        user.right === "admin"
        , action.payload.users
      ) ? (state.pendingNews =
            R.filter(news =>
              news.id !== action.payload.newsId,
              state.pendingNews
            )
          )
        : {}
    }
  }
})

export const selectNews: AppSelector<{approvedNews: News[], pendingNews: News[]}> = selector(state => state.news)

export const { addApprovedNews, addPendingNews, deleteNews } = newsSlice.actions