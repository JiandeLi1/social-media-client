import React, { useRef } from 'react'
import { loginCall } from "../apiCalls"
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import './register.css'
import axios from 'axios'

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const comfirmPassword = useRef()
    const history= useHistory()

     const handleClick = async (e) => {
        e.preventDefault();
         if (password.current.value != comfirmPassword.current.value) {
            password.current.setCustomValidity("Passwords are not match!")
         } else {
             const user = {
                 username: username.current.value,
                 email: email.current.value,
                 password: password.current.value,
             }
             try {
                 await axios.post("http://localhost:8800/api/auth/register", user)
                 history.push("/login")
             } catch(err) {
                 console.log(err)
             }
          }
    }
    return ( 
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">
                        JDSocial    
                    </h3>
                    <span className="registerDesc">
                        Welcome to the JDSocial!
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={ handleClick }>
                        <input type="email"
                                required
                               placeholder="Email"
                               className="registerInput"
                               ref={ email }
                        />
                        <input type="text"
                            required
                            placeholder="Username"
                            className="registerInput"
                            ref={ username }
                        />
                        <input type="password"
                            required
                            placeholder="Password"
                            className="registerInput"
                            ref={ password }
                        />
                        <input type="password"
                                required
                                placeholder="Comfirm Password"
                                className="registerInput"
                                ref={ comfirmPassword }
                        />
                        <button className="registerButton" type="submit">register</button>
                        <span >
                            <Link to="/login">
                                Go To Login
                            </Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}
