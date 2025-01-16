const request = require('postman-request')

const forecast = (longitude,latitude,callback) => {
    const url =  'https://api.weatherstack.com/current?access_key=fd31370ceb3e445de83518c76c6f775e&query='+latitude+','+longitude+'&units=m'
    request({ url, json:true},(error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature +' degress out. It feels like '+ body.current.feelslike + ' degress out.')
        }

    })
}

module.exports = forecast