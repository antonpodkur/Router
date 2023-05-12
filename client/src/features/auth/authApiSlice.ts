import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation({
            query: credentials => ({
                url: '/api/v1/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        })
    })
})

export const {
    useSignInMutation
} = authApiSlice