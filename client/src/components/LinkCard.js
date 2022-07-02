import React from 'react'

export const LinkCard = ({link}) => {
    return (
        <div className='row'>
            <div className='col s6 offset-s2' style={{fontSize: '1.5rem'}}>
                <h2>Link</h2>
                <p>Your link: 
                    <a href={link.to} target="_blank" rel="noopener noreferrer">
                        {link.where_to}
                    </a>
                </p>
                <p>From where: 
                    <a href={link.from} target="_blank" rel="noopener noreferrer">
                        {link.where_from}
                    </a>
                </p>
                <p>Clicks count: <strong>{link.clicks}</strong></p>
                <p>Creation date: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
            </div>
        </div>
    )
}