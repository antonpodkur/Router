import { useSelector } from "react-redux";
import { axiosPrivate } from "../app/api/axios";
import useRefreshToken from "./useRefreshToken";
import { selectIsLoggedIn } from "../features/auth/authSlice";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.request.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = refresh()
          if (newAccessToken !== null) {
            return axiosPrivate(prevRequest)
          }
          return Promise.reject(error)
        }
        return Promise.reject(error)
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [isLoggedIn, refresh])

  return axiosPrivate
}

export default useAxiosPrivate
