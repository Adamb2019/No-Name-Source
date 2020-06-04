const express = require('express')
const app = express()
const path = require('path')
const bodyparser = require('body-parser')
const ejs = require('ejs')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const fs = require('fs')
const md5 = require('md5')
const config = require('./config.js')
const connection = require('./register/database/database.js')

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.render('register.html', {
        success_message: '',
        error_message: ''
    })
});

app.post('/', async (req, res) => {
    const username = req.body.Username.toLowerCase()
    const nickname = req.body.Username
    const password = req.body.Password
    const email = req.body.Email
    const penguinColor = req.body.penguin_color

    // checks if username already exist
    ifUsernameExists(username).then(async exists => {
        if(exists) {
            res.render('register.html', {
                success_message: '',     
                error_message: `The username ${username} is already registered`     
            })
        } else {
                if(ifUsernameIsBad(username)) {
                    res.render('register.html', {
                        success_message: '',
                        error_message: `The username ${username} cant be used please choose another username`
                    })
                } else {
                    ifEmailExists(email).then(async exists => {
                        if(exists) {
                            res.render('register.html', {
                                success_message: '',
                                error_message: `The email ${email} is already registered to an account`
                            })
                        } else {
                // Saving data to database
                const hashedPassword = await hashPassword(clubPenguinHash(password))
                const info = {
                    Username: username,
                    Nickname: nickname,
                    Password: hashedPassword,
                    Email: email,
                    Color: 1
                }

                connection.query("INSERT INTO penguins SET ?", info), function(err, results) {
                    if(err) throw err;
                    console.log('saved data')
                 }

                 res.render('register.html', {
                     success_message: `Congrats you have created an account called ${username}`,
                     error_message: ''
                 })
                }
            })
          }
        }
    });    
});

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/register'))
app.use('/css', express.static(path.join(__dirname, '/register/css')))
app.use('/images', express.static(path.join(__dirname, '/register/images')))
app.use('/js', express.static(path.join(__dirname + '/register/js')))

app.listen(config.port, () => {
    console.log(`Running on port ${config.port}`)
});

function ifUsernameExists(username) {
    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM penguins", function (err, results) {
            for(let i = 0; i < results.length; i++) {
                if(username === results[i].Username) {
                    return resolve(true)
                } 
            }

            resolve(false)
        })
    })
}

function ifUsernameIsBad(username) {
    let content = fs.readFileSync('./names.txt')
    if(content.indexOf(username) > -1) {
        return true
    }
}

function clubPenguinHash(password) {
        password = md5(password).toUpperCase(); 
        password = password.substr(16, 16) + password.substr(0, 16);  
        password += 'nodeJS'; 
        password += 'Y(02.>\'H}t":E1';
        password = md5(password);
        password = password.substr(16, 16) + password.substr(0, 16);
        return password;
}

async function hashPassword(password) {
    const hash = await bcrypt.hash(password, 12);
    return hash 
}

function ifEmailExists(email) {
    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM penguins", function (err, results) {
            for(let i = 0; i < results.length; i++) {
                if(email === results[i].Email) {
                    return resolve(true)
                }
            }

            resolve(false)
        })
    })
}