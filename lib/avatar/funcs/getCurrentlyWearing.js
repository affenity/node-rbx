const fetch = require('../../util/fetch.js')



module.exports = async function (userId) {
    var newPromise = new Promise(function(resolve, reject) {

        var url = `https://avatar.roblox.com/v1/users/${userId}/currently-wearing`
        fetch(url).then(res=>{
            var json = JSON.parse(res.body);
                var assetIds = json.assetIds;
                if (!assetIds) return reject("Failed to get currently wearing of user " + userId);
                resolve(assetIds);
            
        }).catch(reject);

    })
    return newPromise
}