import React, { Suspense } from 'react'
import 'materialize-css'
import './App.css'
import { useAuth } from '../hooks/auth-hook'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from './context/auth-context.js'
import LinksPage from '../pages/LinkPage'
import CreatePage from '../pages/CreatePage'
import DetailPage from '../pages/DetailPage'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import AuthPage from '../pages/AuthPage'

const App = () => {   
    const { token, userId, login, logout } = useAuth()
    const isAuth = !!token
    return (
        <BrowserRouter>
        <Suspense fallback="Loading...">
            <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
                <div className='container'>
                    {isAuth ? 
                        <>
                        <Navbar/>
                        <Routes>
                            <Route path='/links' element={<LinksPage/>} />
                            <Route path='/create' element={<CreatePage/>} />
                            <Route path='/detail/:id' element={<DetailPage/>} />
                            <Route path='*' element={<CreatePage/>} />
                        </Routes>
                        <Footer/>
                        </> :
                        <Routes>
                            <Route path='/' element={<AuthPage/>} />
                            <Route path='*' element={<AuthPage/>} />
                        </Routes>} 
                </div>
            </AuthContext.Provider>
        </Suspense>
        </BrowserRouter>
    );
}

export default App
