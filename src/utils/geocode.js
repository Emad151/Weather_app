const request = require('request')
const geocodeAccessKey = '69faab914ce14f72b13c6eb61763b77d'




/**
 * function to get the longitude and latitude using the location name (city name)
 * @param {string} locationName 
 * @param {function} callback 
 */
const geocode = (locationName, callback)=>{
    const openCageURL = `https://api.opencagedata.com/geocode/v1/json?key=${geocodeAccessKey}&q=${locationName}`
    request({url: openCageURL, json: true}, (error, response)=>{
        if (error) {
            callback('Error: Unable to connect to weather service.', undefined)
        }else if(response.body.total_results == 0){
            callback('Unable to find location. Try another search!', undefined)
        } else {
            const result = response.body.results[0]
            //console.log(result.geometry.lat, result.geometry.lng)
            callback(undefined,{
                latitude: result.geometry.lat,
                longitude: result.geometry.lng
            })
        }
    })
}



module.exports = geocode