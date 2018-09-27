const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    })
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Oops! Something went wrong',
//         welcomeMessage: 'We are working on it...'
//     })
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello express</h1>')
    res.render('home.hbs', {
        pageTitle: 'Matthew Carr Home Page',  
        welcomeMessage: 'Welcome to the Site!'   
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About This Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfil'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})