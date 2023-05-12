import { useRef, useState, useEffect, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { setLoggedIn } from "../features/auth/authSlice"
import { useSignInMutation } from "../features/auth/authApiSlice"
import { useForm } from "react-hook-form"
import { FormControl, FormLabel, RequiredIndicator, Input, FormErrorMessage, Button } from "@vechaiui/react"

interface FormData {
    email: string
    password: string
}

const Login: React.FC<{}> = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    
    const [signIn, {isLoading} ] = useSignInMutation()
    const [showPassword, setShowPassword] = useState(false)
    const handleToggleShowPassword = () => setShowPassword(!showPassword)
  
    const { register, formState: { errors }, handleSubmit } = useForm<FormData>(); 
    const dispatch = useDispatch()

    useEffect(() => {
        if (emailRef.current) {
             emailRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setErrMsg('')
    },[email, password])

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const onSubmit = async(data: FormData) => {
        try {
            const result = await signIn({email: data.email, password: data.password}).unwrap()
            console.log(result)
            if (result.status === 'success') {
                dispatch(setLoggedIn({}))
                navigate('/')
            }
            else if ( result.status === 'fail') {
                setErrMsg(result.message)
            }
        } 
        catch (err){
            if (err?.status === 400) {
                setErrMsg('Invalid email or password')
            }
            else {
                setErrMsg('Login Failed'); 
            }
        }
    }
    
    return (
        <div className="w-full max-w-xs p-8 space-x-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormControl invalid={Boolean(errors.email)}>
            <FormLabel>
              Email<RequiredIndicator />
            </FormLabel>
            <Input 
                ref={emailRef}
                {...register("email", { required: true })} 
                placeholder="Enter your email." 
                onChange={handleEmailChange}
            />
            {errors.email && errors.email.type === "required" && <FormErrorMessage>Email is required</FormErrorMessage>}
          </FormControl>
  
          <FormControl invalid={Boolean(errors.password)}>
            <FormLabel>
              Password<RequiredIndicator />
            </FormLabel>
            <Input.Group>
              <Input
                className="pr-16"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: true })}
                onChange={handlePasswordChange}
              />
              <Input.RightElement className="w-16">
                <Button type="button" size="xs" variant="solid" onClick={handleToggleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </Input.RightElement>
            </Input.Group>
            {errors.password && errors.password.type === "required" && <FormErrorMessage>Password is required</FormErrorMessage>}
          </FormControl>
        
        {errMsg !== '' && <FormErrorMessage>{errMsg}</FormErrorMessage>}
  
            <Button type="submit" variant="solid" color="primary" loading={isLoading}>Submit</Button>
        </form>
      </div>    
    )
}

export default Login