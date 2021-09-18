const express= require('express') 
const path= require('path')
const hbs= require('hbs')
const Geocode=require('./utilis/geocode.js')
const Forecast=require('./utilis/forecast.js')



const app= express()
const port= process.env.PORT || 4003

// define path for express config
const public= path.join(__dirname,'../public') 
const partialPath= path.join(__dirname,'../views/partial')


// setup for handlebars
app.set('view engine','hbs')
hbs.registerPartials(partialPath)


// setup static directory
app.use(express.static(public))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Randeep Singh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'forecast',
        name: 'Randeep'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help: 'We are happy to help you',
        title: 'We are happy to help',
        name: 'Randeep',
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){

      return res.send({
            error:'Please Enter An Address'
        })
      
    }

    Geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error) {
          return  res.send({error})
        }
        
        Forecast(latitude,longitude,(error,forecastData)=>{
            if (error) {
               return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

        })
    })


    // res.send({
    //     forecast: 'It is Raining',
    //     Location: 'Gujarat',
    //     address:req.query.address,
    // })
})

app.get('/product',(req,res)=>{

    if(!req.query.search){
       return res.send({
          error:'Please provide search item here'
        })
    }


    console.log(req.query.search)
    res.send({
        products:[],
    })
})

app.get('/help/*',(req,res)=>{
    res.send('404',{
        title:'404',
        name:'Randeep Singh',
        errorMessage:'Help article not found',
    })
})

app.get('*',(req,res)=>{
    // res.send('My 404 page')

    res.send('404',{
        title:'404',
        name: 'Randeep',
        errorMessage:'Page Not Found',
    })
})


app.listen(port,()=>{
    console.log('Server created'+ port)
})