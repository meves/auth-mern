const mysql = require('mysql2')
const config = require('config')

module.exports = function connectDB() {
    let connection;    
    try {
        connection = mysql.createConnection({
            host: config.get('dBase.host'),
            user: config.get('dBase.user'),
            password: config.get('dBase.password'),
            database: config.get('dBase.database')
        })
        connection.connect()
    } catch(e) {
        console.log(`Server error ${e.message}`)
        process.exit(1)
    }
    return connection;
}
