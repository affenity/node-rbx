const fetch = require('../../util/fetch.js')
const userClass = require('../class.js')

module.exports = async function (assetId) {
    var newPromise = new Promise(function (resolve, reject) {
        var url = `https://www.roblox.com/API/Comments.ashx?rqtype=getComments&assetID=${assetId}&startIndex=0`
        fetch(url).then(res => {
            if (res.statusCode != 200) {
                reject(`Failed to check the user's followers, status code: ${res.statusCode}, status message: ${res.statusMessage}`)
            } else {
                var json = JSON.parse(res.body);
                resolve(json.data);
            }
        })
    })
    return newPromise
}