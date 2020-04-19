const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8cf78b463a4dccfca6ef49cda44bf3a0&query=' + latitude + ',' + longitude

    //shorthand and destructure
    request({ url, json: true }, (error, { body }) => {
        //when no internet connection
        if (error) {
            //console.log("unable to connect to service")
            callback("unable to connect to service", undefined)
        } else if (body.error) {
            //when internet is present but coordinates or url is invalid
            //console.log("Invalid coordinates")
            callback("Invalid coordinates", undefined)
        } else {
            //console.log(response.body.current.weather_descriptions[0] + ". Is is currently " + response.body.current.temperature + " degrees celcius out there.")
            //console.log(body)
            const data = body.current.weather_descriptions[0] + ". Is is currently " + body.current.temperature + " degrees celcius out there."
            callback(undefined, data)
        }
    })
}

module.exports = forecast