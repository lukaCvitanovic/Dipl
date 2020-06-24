const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'luky472199',
    user: 'root',
    database: 'mydb',
    host: 'localhost',
    port: '3307'
})

let mydb = {}

mydb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users', (err, result) => {
            if(err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

mydb.add_user = (user_name, user_pass) => {
    return new Promise((resolve, reject) => {
        let sql = util.format("INSERT INTO `mydb`.`users` (`user_name`, `user_pass`) VALUES ('%s', '%s');", user_name, user_pass)
        pool.query(sql, (err, result) => {
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

mydb.get_user_id = (user_name, user_pass) => {
    return new Promise((resolve, reject) => {
        let sql = util.format("SELECT user_id FROM mydb.users WHERE user_name = '%s' AND user_pass = '%s';", user_name, user_pass)
        pool.query(sql, (err, result) => {
            if(err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

mydb.add_blind_user = (trackingId) => {
    return new Promise((resolve, reject) => {
        let sql = util.format("INSERT INTO `mydb`.`blind_users` (`TrackingID`) VALUES ('%s');", trackingId)
        pool.query(sql, (err, result) => {
            if(err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

mydb.get_blind_user = (trackingId) => {
    return new Promise((resolve, reject) => {
        let sql = util.format("SELECT user_id FROM mydb.blind_users WHERE TrackingID = '%s';", trackingId)
        pool.query(sql, (err, result) => {
            if(err) {
                return reject(err)
            }
            return resolve([result, sql])
        })
    })
}

mydb.test_error = () => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT IF(500 < 1000, (SELECT table_name FROM information_schema.tables), 'a')"
        pool.query(sql, (err, result) => {
            if(err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

mydb.test_any = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if(err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = mydb