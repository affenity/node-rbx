const fetch = require('../../util/fetch.js')



module.exports = async function (groupId) {
    var newPromise = new Promise(function (resolve, reject) {
        var url = `https://www.roblox.com/api/groups/${groupId}/RoleSets/`
        fetch(url).then(res => {
            var json = JSON.parse(res.body);
            resolve(json);
        }).catch(reject);
    })
    return newPromise
}