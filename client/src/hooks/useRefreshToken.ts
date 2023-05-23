import { setLoggedIn } from "../features/auth/authSlice"
import axios from "axios"
import { useDispatch } from "react-redux"

const useRefreshToken = () => {
  const dispatch = useDispatch()

  const refresh = async () => {
    const response = await axios.get('/api/v1/auth/refresh', { withCredentials: true })
    if (response.status === 200) {
      dispatch(setLoggedIn(true))
      return response.data.access_token
    }
    dispatch(setLoggedIn(false))
    return null
  }
  return refresh
}

export default useRefreshToken
