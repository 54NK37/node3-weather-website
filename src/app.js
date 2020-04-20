const path = require('path')
const hbs = require('hbs')
    //erpress func ,server side programming
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// console.log(__dirname)
// console.log(__filename)

//server taking req and sending res to client
//response could be either html,json,or string
// app.get('', (req, res) => {
//     res.send('<h1> Hello... </h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: "sanket",
//         age: 21
//     })
// })

// app.get('/about', (req, res) => {
//     res.send("About page")
// })

//define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//hbs for dynamic pages
//setup handlebar engines and view location
//app setting
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

//root route
app.get('', (req, res) => {
    //to render dynamic hbs pages
    //automatically search by name in views folder
    //injecting values {}
    res.render('index', {
        title: "Weather App",
        name: "Sanket"
    })
})


//about route
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Sanket"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        msg: "In case of issues ,contact me!",
        name: "Sanket"
    })
})

//static 
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Address is a must in query string' })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                latitude,
                longitude,
                location,
                forecastData
            })
        })


    })



})

app.get('/products', (req, res) => {
    //console.log(req.query   )
    if (!req.query.search) {
        return res.send({ error: "Error ! search query is must" })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help",
        errorMsg: "Help content not found!",
        name: "Sanket"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error",
        errorMsg: "Error code : 404",
        name: "Sanket"
    })
})

//starting server

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is running on port " + port)
})