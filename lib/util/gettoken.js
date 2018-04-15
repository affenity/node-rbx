const fetch = require('node-fetch')

module.exports = async function(url, opts) {
    var newPromise = new Promise(function(resolve, reject) {
        opts = opts || {}


        url = url || opts.url;
    var reqOpts = {
        method : opts.method || "GET",
        headers : {
            'Cookie' : `.ROBLOSECURITY=${process.env.Cookie}`,
            
        },
        body : opts.body || null,
        json : opts.json || false,
    }

    //console.log(reqOpts);
    fetch(url, reqOpts).then(retrieved=>{
        resolve(retrieved);
    }).catch(reject);
})
return newPromise
}