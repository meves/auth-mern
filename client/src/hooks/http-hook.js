import { useState, useCallback } from "react"
import { baseUrl } from "../app/const/baseUrl"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback( async (url, method='GET', body=null, headers={} ) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(baseUrl + url, { method, body, headers })
            const data = await response.json()
            
            if(!response.ok) {
                throw new Error(data.message || `Somthing went wrong`)
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, error, request, clearError }
}