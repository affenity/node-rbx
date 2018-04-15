const fetch = require('../../util/fetch.js')


module.exports = async function(assetId) {
    var newPromise = new Promise(function(resolve, reject) {
        var url = `https://api.roblox.com/marketplace/productinfo?assetId=${assetId}`
        fetch(url).then(res=>{
            res.json().then(json=>{
                return resolve(json);
            }).catch(reject);
        }).catch(reject);
    })
   return newPromise
}