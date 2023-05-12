import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "react-redux"
import { setLoggedIn } from "../features/auth/authSlice"
import { useSignInMutation } from "../features/auth/authApiSlice"

const Login: React.FC<{}> = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLParagraphElement>(null)
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    
    const [signIn, {isLoading} ] = useSignInMutation()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (emailRef.current) {
             emailRef.current.focus()
        }
    }, [])
    
    useEffect(() => {
        setErrMsg('')
    }, [email, pwd])

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        try {
            const result = await signIn({email, password: pwd}).unwrap()
            console.log(result)
            if (result.status === 'success') {
                dispatch(setLoggedIn({}))
                navigate('/')
            }
        } 
        catch (err){
            if (!err?.response) {
                setErrMsg('No server response')
            }
            else if (err.response?.status === 400) {
                setErrMsg('Missing email or password')
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            }
            else {
                setErrMsg('LoginFailed'); 
            }
            if (errRef.current) {
                errRef.current.focus()
            }
        }
    }

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePwdInput = (e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (
        <section>

            <p ref={errRef}>{errMsg}</p>

            <h1>Login</h1>

            <label htmlFor="email">Email:</label>
            <input 
            type="text"
            id="email"
            ref={emailRef}
            value={email}
            onChange={handleEmailInput}
            autoComplete="off"
            required />

            <label htmlFor="pwd">Password:</label>
            <input 
            type="password"
            id="pwd"
            value={pwd}
            onChange={handlePwdInput}
            required />

            <button onClick={handleSubmit}>Sign In</button>

        </section>
    )
    
    return (
        content
    )
}

export default Login