import React, { useEffect, useState } from 'react';
import "./News.scss"
import * as R from "ramda"
import { selectNews, deleteNews, addApprovedNews, addPendingNews } from "../features/newsSlice"
import { useDispatch } from 'react-redux'
import { use, today } from "../utils"
import { v4 } from "uuid"
import { selectUsers } from "../features/usersSlice"

const MkNews = () => {

  const dispatch = useDispatch()

  const [newsTitle, setTitle] = useState("")

  const [newsText, setText] = useState("")

  return (
    <form onSubmit={(e) => (
      e.preventDefault(),
      dispatch(addPendingNews({title: newsTitle, text: newsText, date: today, userId: "", id: v4(), status: "pending"}))
    )}>
      <div>
        <input placeholder='News Title' onChange={(e) => setTitle(e.target.value)} />
        <input placeholder='News Text' onChange={(e) => setText(e.target.value)} />
      </div>
      <button type="submit">Create News</button>
    </form>
  )
}

export const News = () => {

  const [search, setSearch] = useState("")

  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const dispatch = useDispatch()

  const reduxData = use(selectNews)

  const isUserLoggedIn = (localStorage.getItem("_login")?.length || []) > 0

  const sortedNews = () => {
    if (isUserLoggedIn) {
      const allNews = R.concat(reduxData.approvedNews, reduxData.pendingNews)

      const sortedNews = allNews.slice().sort((a, b) => (parseInt(b.date)) - (parseInt(a.date)))

      return sortedNews
    } else {
      const news = reduxData.approvedNews

      const sortedNews = news.slice().sort((a, b) => (parseInt(b.date)) - (parseInt(a.date)))

      return sortedNews
    }
  } 

  const sortedBySearchNews = () => {

    const sorted = R.filter(x => 
      x.title.includes(search) ||
      x.text.includes(search) ||
      x.date.includes(search) 
      , sortedNews()
    )

    return sorted
  }

  const users_ = use(selectUsers).users

  return (
    <div className="NewsPageWrapper">
      <input type="text" placeholder='Search something' style={{fontSize: "1.5rem"}} onChange={(e) => setSearch(e.target.value)} />
      { isUserLoggedIn 
        ? <MkNews />
        : <></>
      }
      <div className="NewsPage">
        {R.map(x =>
          <div className="NewsItem" key={v4()} style={width <= 768 ? {flexBasis: "95%"} : {flexBasis: "calc(50% - 10px)"}}>
            <div className="NewsItemTitle">{x.title}</div>
            <label className="NewsItemText">{x.text}</label>
            <label>{x.date}</label>
            { isUserLoggedIn && x.status === "pending"
              ? <div className="NewsItemAdminPanel">
                  <div onClick={() => 
                    dispatch(deleteNews({
                      newsId: x.id,
                      login: localStorage.getItem("_login") || " ", 
                      password: localStorage.getItem("_password") || " ",
                      users: users_
                    }))
                  }
                  className="NewsItemDelete"
                  >Delete</div>

                  <div onClick={() => (
                    dispatch(addApprovedNews({
                      newsId: x.id,
                      login: localStorage.getItem("_login") || " ", 
                      password: localStorage.getItem("_password") || " ",
                      users: users_
                    })),
                    dispatch(deleteNews({
                      newsId: x.id,
                      login: localStorage.getItem("_login") || " ", 
                      password: localStorage.getItem("_password") || " ",
                      users: users_
                    }))
                  )} 
                  className="NewsItemApprove"
                  >Approve</div>
                </div>
              : <></>
            }
          </div>
        , sortedBySearchNews()
        )}
      </div>
    </div>
  )
};
