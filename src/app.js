const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utility/geocode')
const forecast = require('./utility/forecast')
const { constrainedMemory } = require('process')


//'http://api.weatherstack.com/current?access_key=a99ac185f872164c52901717f830f120&query='

//'https://api.mapbox.com/geocoding/v5/mapbox.places/hosadurga.json?limit=1&proximity=ip&access_token=pk.eyJ1IjoicHJhbmFtciIsImEiOiJja29jcmozczEwY2twMndtcjQzZmVxZXNsIn0.VUXUaek0uIzDOLr6uJEu9A'

const geoCodeBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const weatherStackBaseUrl = 'http://api.weatherstack.com/current?access_key=a99ac185f872164c52901717f830f120&query='


const PublicDirectoryPath = path.join(__dirname,'../Public')
// determine path for handle bars
const viewPath = path.join(__dirname,'../templates/view')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//set handle bards
app.set('view engine', 'hbs')

// set static web page
app.use(express.static(PublicDirectoryPath))

app.set('views',viewPath)
hbs.registerPartials(partialsPath)




//Call Handle bars
app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        createdBy: 'Pranam'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Pranam'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page',
        createdBy: 'Pranam'
    })
})

app.get('/help/*',(req,res) => {
    res.render('undefined',{
        title: '404',
        text: 'Help article not found'
    })
})

app.get('/weather',(req,res)=>{
    console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error:'Please enter address'
        })
    }

    let address = req.query.address
    let geocodeURL = geoCodeBaseUrl + address + '.json?limit=1&proximity=ip&access_token=pk.eyJ1IjoicHJhbmFtciIsImEiOiJja29jcmozczEwY2twMndtcjQzZmVxZXNsIn0.VUXUaek0uIzDOLr6uJEu9A'

geocode(geocodeURL,((data,error)=>{
    if(data){
        const latitude = data.features[0].geometry.coordinates[1]
        const longitude = data.features[0].geometry.coordinates[0]

        console.log(latitude)
        // console.log(longitude)

        forecast(weatherStackBaseUrl, latitude, longitude, ((data,error)=>{
            if(error){
                return res.send({
                    error : error
                })
            } else {


                const weather_descriptions = data.current.weather_descriptions[0]
                const weather_condition = 'The weather in ' + data.location.name + ' is ' + weather_descriptions                
                res.send({
                    forcast : weather_condition,
                    location: data.location.name,
                    address: req.query.address
                })                  
            }
        }))
      
    } else {
        console.log(error)
        return res.send({
            error: 'Unable to fetch co-ordinated for the given address'
        })
    }
}))


})

app.get('*',(req,res) => {
    res.render('undefined',{
        title: '404',
        text: 'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('app listening on 3000')
})