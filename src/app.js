const express = require('express')
const path = require('path')
const hbs = require('hbs')
const getForecast = require('./utils/getForecast')
const geocode = require('./utils/geocode')
const app = express()
const port = 3000

const publicPath = path.join(__dirname, '/../public')
const viewsPath = path.join(__dirname, '/../templates/views')
const partialsPath = path.join(__dirname, '/../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Emad Melad'
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About us',
        name: 'Emad Melad'
    })
})
app.get('/weather', (req,res)=>{
    if (!req.query.location) {
        res.send({
            error:'Please provide a location!'
        })
    } else {
        geocode(req.query.location, (error, geometry)=>{
            if (error) {
                res.send({
                    error
                })
            } else {
                getForecast(geometry, (error, forecast)=>{
                    if (error) {
                        res.send({
                            error
                        })
                    } else {
                        res.send({
                            forecast
                        })
                    }
                })
            }
        })
    
    }
    
})
app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Emad Melad',
        helpText: 'some helpful text.'
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        name: 'Emad Melad',
        title: 'Error 404',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req,res)=>{
    res.render('404', {
        name: 'Emad Melad',
        title: 'Error 404',
        errorMessage: 'cannot find the requested page!'
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))