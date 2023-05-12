import { ReactNode, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { setLoggedIn } from "../features/auth/authSlice"

interface AuthMiddlewareProps {
    children: ReactNode
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({children}) => {
    const [cookies] = useCookies(['logged_in'])
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(cookies)
        if (!!cookies.logged_in === true) {
            dispatch(setLoggedIn({}))
        }
    }, [cookies.logged_in, dispatch])

    return <>{children}</>
}

export default AuthMiddleware