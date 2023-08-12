const request = require('request')

const forecast = (url, lat, long, callback)=>{
    url = url + lat + ',' + long
request(url, (error,response)=>{
    if(error){
        console.log('Unable to fetch weather condition')
    }else{    
const data = JSON.parse(response.body)
callback(data)
}
})    
}

module.exports = forecast