import { createContext, useContext, useState } from "react"
export type userContent = {
  isOpened: Boolean
  setCopy: (c: Boolean) => void
  userInfo: any
  setUserInfo: (u: Object) => void
  cartCount: Number
}

export const MyGlobalContext = createContext<userContent>({
  isOpened: false, // set a default value
  setCopy: () => { },
  userInfo: {},
  setUserInfo: () => { },
  cartCount: 0
})
export const useGlobalContext = () => useContext(MyGlobalContext)