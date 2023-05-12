import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser, logOut, setLoggedIn } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    credentials: 'include',
})

//TODO: Save access token to localstorage and verify if it exists

const baseQueryWithReauth = async ( args: string | FetchArgs, api: BaseQueryApi, extraOptions: any )  => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        console.log("refreshing access token")
        const refreshResult = await baseQuery('/api/v1/auth/refresh', api, extraOptions);
        console.log(refreshResult)
        if (refreshResult?.data) {
            if (refreshResult.data.status === 'success') {
                api.dispatch(setLoggedIn({}))
                result = await baseQuery(args, api, extraOptions);
            }
            else {
                api.dispatch(logOut({}));
            }
        }
        else {
            api.dispatch(logOut({}));
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({ }) 
})