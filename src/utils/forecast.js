const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url2 = 'https://api.darksky.net/forecast/ba46065d725855cf6308a884473abf34/' + latitude + ',' + longitude + '?lang=en&units=si'
    request({ url: url2, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to web services', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast