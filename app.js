const express = require('express')
const cors = require('cors')
const path = require('path')
const config = require('config')

const PORT = config.get('port') || 5000
const app = express()
app.use(cors())
app.use(express.json({ extended: true }))
// routing
app.use('/api/auth', require('./routes/auth-routes'))
app.use('/api/link', require('./routes/link-routes'))
app.use('/t', require('./routes/redirect-routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`The app started on port ${PORT}...`);
})
