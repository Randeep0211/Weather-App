const request = require("request");




const forecast= (latitude,longitude,callback)=>{
    
    const fcURL='http://api.weatherstack.com/current?access_key=814ccba03e0b6c347a7017a8d4b91101&query='+ latitude + ',' + longitude + '&units=f'

    request({url:fcURL , json:true} , (error,response)=>{
        if (error) {
            callback('Unable to connect', undefined)
        } 
 
        else if(response.body.error){
            callback('Typing error',undefined)
        }
 
        else {

            console.log(response.body.current.observation_time)
 
            callback(undefined , ` It is currently ${response.body.location.lat} degress out. it feels like ${response.body.location.lon} an there is 0% chance of rain at ${response.body.current.observation_time}` )
            
        }
    })

}


module.exports= forecast
