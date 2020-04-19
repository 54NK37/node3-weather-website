const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pzbml2OG92MGN2MTQ0cGd3bjVheTFuayJ9.hbZJE6qEZHEsL5QXVF4vtw'

    //shorthand and destructure
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to service', undefined)
        } else if (body.features.length === 0) {
            callback('Invalid place and location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geoCode