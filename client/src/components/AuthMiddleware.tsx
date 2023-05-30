import { ReactNode, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { selectUser, setLoggedIn, setUser } from "../features/auth/authSlice"
import { useSelector } from "react-redux"
import { axiosPrivate } from "../app/api/axios"
import { MeQuerySuccessResult } from "../app/api/queries"
import { User } from "../models/user"
import SpinnerBaseSquareHorizontal from "./SpinnerBaseSquareHorizontal"

interface AuthMiddlewareProps {
  children: ReactNode
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [cookies] = useCookies(['logged_in'])
  const dispatch = useDispatch()
  let user = useSelector(selectUser)

  useEffect(() => {
    const getUser = async (): Promise<User> => {
      const user = (await axiosPrivate.get<MeQuerySuccessResult>('/api/v1/auth/me')).data.data.user
      return user
    }
    setIsLoading(true);
    (async () => {
      if (!!cookies.logged_in === true) {
        dispatch(setLoggedIn({}))
        if (user === null) {
          user = await getUser();
          dispatch(setUser(user))
        }
      }
    })()
    setIsLoading(false);
  }, [cookies.logged_in, dispatch])

  // return <>{children}</>
  return (
    <>
    {isLoading? SpinnerBaseSquareHorizontal: children}
    </>
  );
}

export default AuthMiddleware
