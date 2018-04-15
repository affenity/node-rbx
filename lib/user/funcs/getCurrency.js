const fetch = require('../../util/fetch.js')


module.exports = async function() {
    if (!global.xcsrf) throw new Error("Please make sure you're logged into an account before you can use this function!")
    var newPromise = new Promise(function(resolve, reject) {
        fetch('https://api.roblox.com/currency/balance').then(res=>{
        var json = JSON.parse(res.body);
        
            var robux = json.robux
            if (robux==null) return reject("Failed to fetch currency, might have invalid auth. token")
            return resolve(robux);
    
    })
    })
    return newPromise
}