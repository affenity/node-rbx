const fetch = require('../../util/fetch.js')
const userClass = require('../class.js')

module.exports = async function (userId) {
    var newPromise = new Promise(function (resolve, reject) {
        var url = `https://api.roblox.com/users/${userId}/groups`
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