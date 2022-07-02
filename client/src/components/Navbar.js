import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { AuthContext } from '../app/context/auth-context.js'

export const Navbar = () => {
    const history = createBrowserHistory({ window })
    const auth = useContext(AuthContext)
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()        
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-2" style={{paddingLeft: '1em'}}>
            <a href="/" className="brand-logo">Logo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/Links">Links</NavLink></li>
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/detail/:id">Detail</NavLink></li>
                <li>
                    <a href="/" className="waves-effect blue darken-3 btn"
                        onClick={logoutHandler}>
                        Logout
                    </a>
                </li>
            </ul>
            </div>
        </nav>
    )
}