const router = require('express').Router()
const connectDB = require('../utils/createConnection')

router.get('/:code', async (req, res) => {
    const code = req.params.code
    let query = 'SELECT where_from, clicks FROM `link` WHERE `code` = ?'
    const connection = connectDB()
    try {
        connection.execute(query, [code], (err, results) => {
            if (err) {
                connection.end()
                throw err
            } else {
                if (results.length !== 0) {
                    let clicks = results[0].clicks + 1
                    let link = results[0].where_from
                    query = 'UPDATE IGNORE `link` SET `clicks` = ? WHERE `code` = ?'
                    connection.execute(query, [clicks, code], (err, results) => {
                        if (err) {
                            connection.end()
                            throw err
                        } else {
                            res.redirect(link)
                            return res.status(200).json({ clicks })
                        }
                    })
                } else {
                    connection.end()
                    return res.status(404).json({
                        message: 'The requested resource does not exist'
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