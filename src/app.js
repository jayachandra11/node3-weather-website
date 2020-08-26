const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define paths for Express and config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates')

//setup handlers and view locationcd
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))




app.get('',(req,res) => {
    res.render('index',{
        title:'Weather data',
        name:'NJC'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Weather data',
        name:'NJC'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'Weather data',
        name:'NJC'
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error:'Please provide search product'
        })
    }
    res.send({
        product:req.query.search,
        product_rating:'5',
        price:200
    })
})

app.get('/weather',(req,res) =>
{
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide address'
        })
    }
    
    else
    {
        location = req.query.address
geocode(location,(error, {latitude,longitude,location}={})=>{
    
    if(error)
    {
        return res.send({error:error})
        //return console.log(error);
    }
    forecast(latitude,longitude,(error, forecastData)=>{
        if(error)
        {
        //console.log(error)
         return  res.send({
             error:error
         }) 
        }
        return res.send({
            location:location,
            forecastData:forecastData,
            given_address:req.query.address

        })

        //console.log(location);
        
        //console.log(forecastData);
         }) 
    })
    }
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Help page not found'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title:'404 page not found'
    })
})

//to send directly 
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>');
// })


//to use static pages
app.use(express.static(publicDirectoryPath))




app.listen(port,()=>{
    console.log('Server is up on port '+port);
})