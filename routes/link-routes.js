const router = require('express').Router()
const auth = require('../middleware/auth-middleware')
const config = require('config')
const shortid = require('shortid')
const connectDB = require('../utils/createConnection')

router.post('/generate', auth, async (req, res) => {
    const baseUrl = config.get('baseUrl')
    const { from } = req.body
    const code = shortid.generate()
    
    const connection = connectDB()
    let query = 'SELECT * FROM `link` WHERE `where_from` = ?';
    try {
        connection.execute(query, [from], (err, results) => {
            if (err) {
                connection.end()
                throw err
            } else {
                if (results.length !== 0) {
                    connection.end()
                    return res.status(200).json({ link: results[0] })
                } else {
                    const to = baseUrl + '/t/' + code
                    query = 'INSERT INTO `link` (where_from, where_to, code, owner) VALUES (?, ?, ?, ?)'
                    connection.execute(query, [from, to, code, req.user.userId], (err, results) => {
                        if (err) {
                            connection.end()
                            throw err
                        } else {
                            query = 'SELECT id, data, clicks FROM `link` WHERE `code` = ?'
                            connection.execute(query, [code], (err, results) => {
                                if (err) {
                                    connection.end()
                                    throw err
                                } else {
                                    connection.end()
                                    return res.status(201).json({
                                        link: { 
                                                id: results[0].id, 
                                                where_from: from,
                                                where_to: to,
                                                code: code,
                                                data: results[0].data,
                                                clicks: results[0].clicks,
                                                owner: req.user.userId
                                            }
                                    })
                                }
                            })
                        }
                    })

                }
            }
        })
    } catch (e) {
        connection.end()                
        return res.status(500).json({
            message: 'Something went wrong. Please, try again later.'
        })
    }
})

router.get('/', auth, async (req, res) => {
    const connection = connectDB()
    const query = 'SELECT * FROM `link` WHERE `owner` = ?'
    try {
        connection.execute(query, [req.user.userId], (err, results) => {
            if (err) {
                connection.end()
                throw err
            } else {
                connection.end()
                if (results.length !== 0) {
                    return res.status(200).json(results.map(result => result))
                } else {
                    return res.status(400).json({
                        message: 'The user has no links'
                    })
                }
            }
        })
    } catch(e) {
        connection.end()                
        return res.status(500).json({
            message: 'Something went wrong. Please, try again later.'
        })
    }
})

router.get('/:id', async (req, res) => {
    const connection = connectDB()
    const query = 'SELECT  * FROM `link` WHERE `id` = ? and `owner` = ?'
    try {
        connection.execute(query, [req.params.id, req.user.userId], (err, results) => {
            if (err) {
                connection.end()
                throw err
            } else {
                connection.end()
                if (results.length !== 0) {
                    return res.status(200).json(results[0])
                } else {
                    return res.status(400).json({
                        message: 'This link does not exist'
                    })
                }
            }
        })
    } catch(e) {
        connection.end()                
        return res.status(500).json({
            message: 'Something went wrong. Please, try again later.'
        })
    }
})

module.exports = router
