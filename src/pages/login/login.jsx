import React, { useContext, useRef } from 'react'
import { loginCall } from "../apiCalls"
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'
import './login.css'

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext)
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({
            email: email.current.value,
            password: password.current.value
        }, dispatch)
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">
                        JDSocial    
                    </h3>
                    <span className="loginDesc">
                        Welcome to the JDSocial!
                    </span>
                </div>
                <form className="loginRight" onSubmit={handleClick}>
                    <div className="loginBox">
                        <input type="Email"
                            required
                            placeholder="Email"
                            className="loginInput"
                            ref={email} />
                        <input type="password"
                            required
                            // minLength="6"
                            placeholder="Password"
                            className="loginInput"
                            ref={ password }/>
                        <button className="loginButton" type="submit" disable={ isFetching }>
                            { isFetching ? <CircularProgress color="white" size="20px"/> : "Login"}
                        </button>
                        <span className="loginForgot">Forget Password</span>
                        <span className="loginRegister">
                            <Link to="/register">
                                Creat a New Account
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}
