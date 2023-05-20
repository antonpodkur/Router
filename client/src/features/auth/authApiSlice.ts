import { apiSlice } from "../../app/api/apiSlice";
import { MeQuerySuccessResult } from "../../app/api/queries";
import { User } from "../../models/user";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation({
            query: credentials => ({
                url: '/api/v1/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        signUp: builder.mutation({
            query: credentials => ({
                url: '/api/v1/auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        me: builder.query<User, null>({
            query: () => '/api/v1/auth/me',
            // transformResponse: (rawResult: {data: {data: {user: User}}}, meta) => {
            //     return rawResult.data.data.user
            // }
        })
    })
})

export const {
    useSignInMutation,
    useSignUpMutation,
    useMeQuery
} = authApiSlice

export default authApiSlice