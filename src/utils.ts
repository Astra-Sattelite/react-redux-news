import * as D from "date-fns"
import { AppDispatch, RootState } from "./app/store"
import { PayloadAction } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const today = D.format(new Date(),'dd.MM.yyyy')

// export const useAppDispatch = useDispatch<AppDispatch>()

export const useDsp = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (f: () => PayloadAction) => () =>
    dispatch(f())
}
export const use: TypedUseSelectorHook<RootState> = useSelector

export type AppSelector<T> = (state: RootState) => T

export const selector = <T>(f: AppSelector<T>): AppSelector<T> => f