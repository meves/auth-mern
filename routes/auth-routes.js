const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = require('express').Router()
const connectDB = require('../utils/createConnection')

/* 
** -> /api/auth 
*/
router.post('/register', 
    body('email', 'incorrect email').isEmail(),
    body('password', 'password length 6 or more symbols').isLength({min: 6}),
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(req.body);
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }
        const connection = connectDB()
        try {
            const { email, password } = req.body
            let query = 
                'SELECT email FROM `user` WHERE `email` = ?';
            connection.execute(query, [email], (err, results, fields) => {
                if (err) {    
                    connection.end()                
                    throw err
                }
                else {
                    if (results.length === 0) {
                        bcrypt.hash(password, 12, (err, hash) => {
                            if (err) {
                                connection.end()                                            
                                throw err
                            }
                            query = 'INSERT INTO `user` VALUES (NULL, ?, ?);' 
                            connection.execute(query, [email, hash], (err, results) => {
                                if (err) {
                                    connection.end()                                                
                                    throw err
                                }
                                connection.end()                
                                return res.status(201).json({
                                    message: 'User successfully added' 
                                })
                            })
                        })                    
                    }
                    else {
                        connection.end()                
                        return res.status(400).json({
                            message: `The user already exists. Please change your login or password`
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
    }
)

router.post('/login', 
    body('email').normalizeEmail().isEmail(),
    body('password').exists().isLength({min: 6}),
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect credentials data'
            })
        }
        const connection = connectDB()
        try {
            const { email, password } = req.body
            const query = 'SELECT `id`, `email`, `password` FROM `user` WHERE `email` = ?';
            connection.execute(query, [email], (err, results) => {
                if (err) {
                    connection.end()
                    throw err
                } 
                else {
                    if (results.length === 0) {
                        connection.end()
                        return res.status(400).json({
                            message: `Login or password is not correct`
                        })
                    } 
                    else {
                        bcrypt.compare(password, results[0].password, (err, result) => {
                            if (err) {
                                connection.end()
                                throw err
                            }
                            else {
                                if (result) {
                                    connection.end()
                                    jwt.sign(
                                        {
                                            userId: results[0].id,
                                            userEmail: results[0].email
                                        },
                                        config.get('jwtSecret'),
                                        {
                                            expiresIn: '24h'
                                        },
                                        (err, token) => {
                                            if (err) {
                                                connection.end()
                                                throw err
                                            } else {
                                                return res.status(200).json({
                                                    token,
                                                    userId: results[0].id,
                                                    message: 'You successfully logged in'
                                                })
                                            }
                                        }
                                    )
                                } else  {
                                    connection.end()
                                    return res.status(400).json({
                                        message: 'Login or password is not correct'
                                    })
                                }
                            }
                        })

                    }
                }

            })
        } catch(e) {
            return res.status(500).json({
                message: 'Something went wrong. Please, try again later.'
            })
        }
    }
)

module.exports = router