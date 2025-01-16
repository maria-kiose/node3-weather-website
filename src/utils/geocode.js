const request = require('postman-request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ address +'&access_token=pk.eyJ1IjoibWFyaWEta2lvc2UiLCJhIjoiY201djJuOHV3MDJpdDJpcGhxN2FkOTl2YSJ9.MA7Vzr8xwT2L1EgfO9Kurw&limit=1'
    
    request({url, json: true},(error,{body}) => {
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.',undefined)
         }else{
             const latitude = body.features[0].geometry.coordinates[1] 
             const longitude =body.features[0].geometry.coordinates[0]
             callback(undefined,{
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address
            })
        }
    })
}

module.exports = geocode