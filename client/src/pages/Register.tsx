import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useSignUpMutation } from "../features/auth/authApiSlice"
import { useForm } from "react-hook-form"
import { FormControl, FormLabel, RequiredIndicator, Input, FormErrorMessage, Button } from "@vechaiui/react"
import { useTranslation } from "react-i18next"

interface FormData {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const Login: React.FC<{}> = () => {
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const {t, i18n} = useTranslation()

  const [signUp, { isLoading }] = useSignUpMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConf, setShowPasswordConf] = useState(false)
  const handleToggleShowPassword = () => setShowPassword(!showPassword)
  const handleToggleShowPasswordConf = () => setShowPasswordConf(!showPasswordConf)

  const { register, formState: { errors }, handleSubmit, watch } = useForm<FormData>();


  const watchedName = watch("name");
  const watchedEmail = watch("email");
  const watchedPassword = watch("password");
  const watchedPasswordConf = watch("passwordConfirm");

  useEffect(() => {
    setErrMsg('')
  }, [watchedName, watchedEmail, watchedPassword, watchedPasswordConf])

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signUp({ name: data.name, email: data.email, password: data.password, passwordConfirm: data.passwordConfirm }).unwrap()
      console.log(result)
      if (result.status === 'success') {
        navigate('/login')
      }
      else if (result.status === 'fail') {
        setErrMsg(result.message)
      }
    }
    catch (err) {
      // @ts-ignore
      if (err?.status === 400) {
        setErrMsg('Invalid name, email or password')
      }
      else {
        setErrMsg('Registration failed');
      }
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-11/12 md:w-3/6 lg:w-4/12">
        <FormControl invalid={Boolean(errors.name)}>
          <FormLabel>
            {t("Name")}<RequiredIndicator />
          </FormLabel>
          <Input
            {...register("name", { required: true })}
            placeholder={t("Enter your name") as string}
          />
          {errors.name && errors.name.type === "required" && <FormErrorMessage>Name is required</FormErrorMessage>}
        </FormControl>

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

        <FormControl invalid={Boolean(errors.passwordConfirm)}>
          <FormLabel>
            {t("Repeat password")}<RequiredIndicator />
          </FormLabel>
          <Input.Group>
            <Input
              className="pr-16"
              type={showPasswordConf ? "text" : "password"}
              placeholder={t("Repeat password") as string}
              {...register("passwordConfirm", { required: true })}
            />
            <Input.RightElement className="w-16 mr-2">
              <Button type="button" size="xs" variant="solid" onClick={handleToggleShowPasswordConf}>
                {showPasswordConf ? t("Hide") : t("Show")}
              </Button>
            </Input.RightElement>
          </Input.Group>
          {errors.passwordConfirm && errors.passwordConfirm.type === "required" && <FormErrorMessage>Password confirmation is required</FormErrorMessage>}
        </FormControl>

        {errMsg !== '' && <FormErrorMessage>{errMsg}</FormErrorMessage>}

        <Button type="submit" variant="solid" color="primary" loading={isLoading}>{t("Submit")}</Button>
      </form>
    </div>
  )
}

export default Login
