const path = require('path')
const express =  require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths fr express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engne and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//etup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Maria Kiose'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        message: 'Hello chicas have a beautiful day!',
        title: 'Help',
        name : 'Maria Kiose' 
    })
} )

app.get('/about',(req , res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Maria Kiose'
    })
})


app.get('/help/*',( req, res )=>{
    res.render('404',{
        title: '404',
        name: ' Maria Kiose',
        errorMessage: 'Help article not found!'

     })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        res.send({
            error: 'You must provide an address term'
        })
    }else{
        console.log(req.query.address)
        geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(longitude, latitude, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
      
                res.send({
                    location,
                    forecastData: forecastData,
                    address: req.query.address
            
                })
            })
        })

        
    }
    
})


if(!process.argv[2]){
    console.log('Please provide an address')
}else{
    geocode(process.argv[2],(error,{longitude,latitude,location}={})=>{
        if(error){
            return console.log(error)
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return console.log(error)
            }
            console.log(location)
            console.log(forecastData)
        })
    })
}


app.get('/products',(req, res)=>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*',(req, res)=>{
     res.render('404',{
        title: '404',
        name: ' Maria Kiose',
        errorMessage: 'Page not found!'

     })
})

app.listen(3000,() =>{
    console.log('Server is up on port 3000')
})
