const fetch = require('../../util/fetch.js')


module.exports = async function(assetId) {
    var newPromise = new Promise(function(resolve, reject) {
        var url = `https://api.roblox.com/marketplace/game-pass-product-info?gamePassId=${assetId}`
        fetch(url).then(res=>{
            res.json().then(json=>{
                var Creator = json.Creator,
                ProductId = json.ProductId;
                if (!Creator || !ProductId) reject("Invalid ID, this function is for gamepasses only!")
                return resolve(json);
            }).catch(reject);
        }).catch(reject);
    })
   return newPromise
}