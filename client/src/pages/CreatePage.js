import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http-hook'
import { AuthContext } from '../app/context/auth-context.js'
import { createBrowserHistory } from 'history'
import { Navigate } from 'react-router-dom'

const CreatePage = () => {
    const history = createBrowserHistory({ window })
    const auth = useContext(AuthContext) 
    const { request } = useHttp()

    const [link, setLink] = useState('')
    const [uri, setUri] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
        //setUri('')
    }, [])

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${auth.token}` })
                history.push(`/detail/${data.link.id}`)
                setUri(`/detail/${data.link.id}`)
            } catch (e) {}
        }
    }
    if (uri !== '') {
        return <Navigate to={uri} />
    }
    return (
        <div className='row'>
            <div className='col s8 offset-s2' style={{paddingTop: '2em'}}>
                <div className="input-field">
                    <input
                        placeholder="Enter link to shorten" 
                        id="link" 
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyDown={pressHandler}
                    />
                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    )
}

export default CreatePage
