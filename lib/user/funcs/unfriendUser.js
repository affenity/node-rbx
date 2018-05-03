const post = require('../../util/post.js');


module.exports = async function (userId) {
    var newPromise = new Promise(function (resolve, reject) {
        let url = `https://api.roblox.com/user/unfriend?friendUserId=${userId}`
        post(url).then(res => {
            if (res.statusCode != 200) {
                reject(`Failed to add user, status code: ${res.statusCode}, status message: ${res.statusMessage}`)
            } else {
                var json = JSON.parse(res.body);
                if (!json || !json.success || !json.message) reject("Server didn't return expected JSON information");
                if (json.success == true) resolve(true);
                reject(json.message);
            }
        }).catch(reject);
    })
    return newPromise
}