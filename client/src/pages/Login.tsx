import { useRef, useState, useEffect, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { setLoggedIn, setUser } from "../features/auth/authSlice"
import authApiSlice, { useMeQuery, useSignInMutation } from "../features/auth/authApiSlice"
import { useForm } from "react-hook-form"
import { FormControl, FormLabel, RequiredIndicator, Input, FormErrorMessage, Button } from "@vechaiui/react"
import { User } from "../models/user"
import { MeQuerySuccessResult } from "../app/api/queries"
import { apiSlice } from "../app/api/apiSlice"
import { axiosPrivate } from "../app/api/axios"
import { useTranslation } from "react-i18next"

interface FormData {
  email: string
  password: string
}

const Login: React.FC<{}> = () => {
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const {t, i18n} = useTranslation()

  const [signIn, { isLoading }] = useSignInMutation()
  const [showPassword, setShowPassword] = useState(false)
  const handleToggleShowPassword = () => setShowPassword(!showPassword)

  const { register, formState: { errors }, handleSubmit, watch } = useForm<FormData>();
  const dispatch = useDispatch()

  const watchedEmail = watch("email");
  const watchedPassword = watch("password");


  useEffect(() => {
    setErrMsg('')
  }, [watchedEmail, watchedPassword])

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signIn({ email: data.email, password: data.password }).unwrap()
      console.log(result)
      if (result.status === 'success') {
        dispatch(setLoggedIn({}))
        const userResult = (await axiosPrivate.get<MeQuerySuccessResult>('/api/v1/auth/me')).data;
        dispatch(setUser(userResult.data.user))
        navigate('/')
      }
      else if (result.status === 'fail') {
        setErrMsg(result.message)
      }
    }
    catch (err) {
      // @ts-ignore
      if (err?.status === 400) {
        setErrMsg('Invalid email or password')
      }
      else {
        setErrMsg('Login Failed');
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center items-center p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-11/12 md:w-3/6 lg:w-4/12">
        <FormControl invalid={Boolean(errors.email)}>
          <FormLabel>
            {t("Email")}<RequiredIndicator />
          </FormLabel>
          <Input
            {...register("email", { required: true })}
            placeholder={t("Enter your email") as string}
          />
          {errors.email && errors.email.type === "required" && <FormErrorMessage>Email is required</FormErrorMessage>}
        </FormControl>

        <FormControl invalid={Boolean(errors.password)}>
          <FormLabel>
            {t("Password")}<RequiredIndicator />
          </FormLabel>
          <Input.Group>
            <Input
              className="pr-16"
              type={showPassword ? "text" : "password"}
              placeholder={t("Enter password") as string}
              {...register("password", { required: true })}
            />
            <Input.RightElement className="w-16 mr-2">
              <Button type="button" size="xs" variant="solid" onClick={handleToggleShowPassword}>
                {showPassword ? t("Hide") : t("Show")}
              </Button>
            </Input.RightElement>
          </Input.Group>
          {errors.password && errors.password.type === "required" && <FormErrorMessage>Password is required</FormErrorMessage>}
        </FormControl>

        {errMsg !== '' && <FormErrorMessage>{errMsg}</FormErrorMessage>}

        <Button type="submit" variant="solid" color="primary" loading={isLoading}>{t("Submit")}</Button>
      </form>
    </div>
  )
}

export default Login
