import { ReactNode, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { selectUser, setLoggedIn, setUser } from "../features/auth/authSlice"
import { useSelector } from "react-redux"
import axios from "../app/api/axios"
import { MeQuerySuccessResult } from "../app/api/queries"
import { User } from "../models/user"

interface AuthMiddlewareProps {
  children: ReactNode
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const [cookies] = useCookies(['logged_in'])
  const dispatch = useDispatch()
  let user = useSelector(selectUser)

  useEffect(() => {
    const getUser = async (): Promise<User> => {
      const user = (await axios.get<MeQuerySuccessResult>('/api/v1/auth/me')).data.data.user
      return user
    }

    (async () => {
      if (!!cookies.logged_in === true) {
        dispatch(setLoggedIn({}))
        if (user === null) {
          user = await getUser();
          dispatch(setUser(user))
        }
      }
    })()
  }, [cookies.logged_in, dispatch])

  return <>{children}</>
}

export default AuthMiddleware
