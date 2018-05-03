const fetch = require('../../util/fetch.js')
const userClass = require('../class.js')

module.exports = async function (userId) {
    var newPromise = new Promise(function (resolve, reject) {
        var url = `https://www.roblox.com/Contests/Handlers/Showcases.ashx?userId=${userId}`
        fetch(url).then(res => {
            if (res.statusCode != 200) {
                reject(`Failed to check the user's followers, status code: ${res.statusCode}, status message: ${res.statusMessage}`)
            } else {
                var json = JSON.parse(res.body);
                if (json.Error & json.Error!='') reject(json.Error);
                resolve(json);
            }
        })
    })
    return newPromise
}