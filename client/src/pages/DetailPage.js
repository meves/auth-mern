import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../app/context/auth-context'
import { LinkCard } from '../components/LinkCard'
import { Loader } from '../components/Loader'
import { useAuth } from '../hooks/auth-hook'
import { useHttp } from '../hooks/http-hook'

const DetailPage = () => {
    const { token } = useAuth(AuthContext)
    const { request, loading } = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id 

    const getLink = useCallback( async () => {
        try {
            const fetched = await request(`api/link/${linkId}`, 'GET', null, { Authorization: `Bearer ${token}`})
            setLink(fetched)
        } catch (e) {}
    }, [linkId, token, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }
    return (
        <>            
            { !loading && link && <LinkCard link={link}/> }        
        </>
    )
}

export default DetailPage
