import React from 'react'
import { Link } from 'react-router-dom'

export const LinksList = ({links}) => {
    if (!links.length) {
        return <p className="center">There are not links yet</p> 
    }
    return (
        <div className="row">
            <div className=" col s6 offset-s3">
                <table className="responsive-table highlight" style={{fontSize: '1.2rem'}}>
                    <thead>
                    <tr>
                        <th>N</th>
                        <th>Original</th>
                        <th>Reduced</th>
                        <th>Open</th>
                    </tr>
                    </thead>

                    <tbody>
                    { links.map((link, index) => (
                        <tr key={link.id}>
                            <td>{index + 1}</td>
                            <td>{link.where_from}</td>
                            <td>{link.where_to}</td>
                            <td>
                                <Link to={`/detail/${link.id}`}>Open</Link>
                            </td>
                        </tr>                    
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}