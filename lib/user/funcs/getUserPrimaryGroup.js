const fetch = require('../../util/fetch.js')
const userClass = require('../class.js')

module.exports = async function (username) {
    var newPromise = new Promise(function (resolve, reject) {
        var url = `https://www.roblox.com/Groups/GetPrimaryGroupInfo.ashx?users=${username}`
        fetch(url).then(res => {
            if (res.statusCode != 200) {
                reject(`Failed to check the user's followers, status code: ${res.statusCode}, status message: ${res.statusMessage}`)
            } else {
                var json = JSON.parse(res.body);
                if (!json[username]) reject("Couldn't find the user's primary group");
                resolve(json[username]);
            }
        })
    })
    return newPromise
}