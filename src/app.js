const path = require('path')
const express=require('express')   
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')


const app=express()             

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location
app.set('view engine','hbs')        
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather Today',
        name:'Vakul Singh'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Vakul Singh'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpText:'This is a website to get information about current weather.You just need to enter a location to get weather result. ',
        title:'Help',
        name:'Vakul Singh'
    })
})

//res stringify object data itself to convert to JSON
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }


    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({ error })
        }   
    
        forecast(latitude, longitude ,(error,forecastData) =>{
            if(error){
                return res.send({ error: error })
            }   
            res.send({
                forecast: forecastData,
                location: location,
                address:   req.query.address
                
            })               
        })
    })
})


app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Vakul Singh',
        errorMessage:'Help article not found'
    })
})






app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Vakul Singh',
        errorMessage:'page not found'
    })
})
// app.com 

// lets start the server up,process of starting a server is a asynchronous process

app.listen(3000, () => {
    console .log('Server is up on port 3000')
})