const fetch = require('../../util/fetch.js')



module.exports = async function (userId) {
    var newPromise = new Promise(function(resolve, reject) {
        var url = `https://avatar.roblox.com/v1/users/${userId}/avatar`
        fetch(url).then(res=>{
            var json = JSON.parse(res.body);
                var scales = json.scales;
                if (!scales) return reject("Failed to get avatar");
                resolve(json);
            
        }).catch(reject);
    })
    return newPromise
}