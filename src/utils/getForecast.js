const request = require('request')
const weatherStackAccessKey = '07f9469772385ad081b136fb5844a160'


/**
 * function that gets the weather data from API and prints the forecast to the console
 * @param {object} param0 
 */

const getForecast = ({latitude, longitude}={}, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=${weatherStackAccessKey}&query=${latitude},${longitude}`
    request({url: url, json: true}, (error, {body}={})=>{
        if (error) {
            callback('Error: cannot connect to the weather service.', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another search!', undefined)
        } else {
            const forecast = `Hello from ${body.location.name}!. It's currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees out.`
            callback(undefined, forecast)
        }
    })
}

module.exports = getForecast