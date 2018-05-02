const fetch = require('../../util/fetch.js')
const cheerio = require('cheerio');



module.exports = async function (requestId, groupId) {
    var newPromise = new Promise(async function (resolve, reject) {
        var url = `https://www.roblox.com/group/handle-join-request`

        fetch(url, {
            method: "POST",
            form: {
                groupJoinRequestId: requestId
            },
        }).then(async res => {
            var json = JSON.parse(res.body);
            if (!json.success) reject("Failed to unblock user");
            resolve(true);
        })
    })
    return newPromise
}