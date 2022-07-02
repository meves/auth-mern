import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../app/context/auth-context.js'
import { useHttp } from '../hooks/http-hook'
import { useMessage } from '../hooks/message-hook'

const AuthPage = () => {
    const auth = useContext(AuthContext)

    const message = useMessage()
    const  { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const registarHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
            message(data.message)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className='col s6 offset-s3'>
                <h1>Reduce Link</h1>
                <div className="card blue darken-2">
                    <div className="card-content white-text">
                        <span className="card-title">Auhorization</span>
                        <div>

                        <div className="input-field">
                            <input 
                                name='email'
                                placeholder="Enter your email address" 
                                id="email" 
                                type="email"
                                onChange={changeHandler}
                                value={form.email}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input 
                                name='password'
                                placeholder="Enter your password" 
                                id="password" 
                                type="password"
                                onChange={changeHandler}
                                value={form.password}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className='btn green darken-1' 
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Login
                        </button>
                        <button 
                            className='btn blue darken-1 black-text'
                            onClick={registarHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
