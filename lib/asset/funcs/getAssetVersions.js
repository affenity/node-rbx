const fetch = require('node-fetch');



module.exports = async function(assetId) {
    var url = `https://api.roblox.com/assets/${assetId}/versions`
    fetch(url).then(res=>{
        
    })
}




class assetVersion {
    constructor(list) {

    }
}