//https://rprxy.xyz/proxy/api/searchmusic/rat%20twist

const fetch = require('../../util/fetch.js')
const userClass = require('../class.js')

module.exports = async function (name) {
    var newPromise = new Promise(function (resolve, reject) {
        var url = `https://rprxy.xyz/proxy/api/searchmusic/${encodeURIComponent(name)}`
        fetch(url).then(res => {
            if (res.statusCode != 200) {
                reject(`Failed to check the user's followers, status code: ${res.statusCode}, status message: ${res.statusMessage}`)
            } else {
                var json = JSON.parse(res.body);
                resolve(json);
            }
        })
    })
    return newPromise
}