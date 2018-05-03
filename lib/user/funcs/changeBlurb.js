//https://www.roblox.com/account/settings/description

const post = require('../../util/strictpost.js')

module.exports = async function (newDesc) {
    var newPromise = new Promise(function (resolve, reject) {
        let url = `https://www.roblox.com/account/settings/description`
        post(url, { inputs: { Description: newDesc } }).then(res => {
            if (res.statusCode != 200) {
                reject(`Failed to change blurb, status code: ${res.statusCode}, status message: ${res.statusMessage}`)
            } else {
                resolve(true);
            }
        }).catch(reject);
    })
    return newPromise;
}