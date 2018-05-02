const request = require('request');

module.exports = async function(url, opts) {
    var newPromise = new Promise(function(resolve, reject) {
        opts = opts || {}


        url = url || opts.url;
    var reqOpts = {
        method : opts.method || "GET",
        headers : {
            'x-csrf-token' : global.xcsrf
        },
        jar: global.jar,
        body : opts.body || null,
        json : opts.json || false,
        form : opts.form || null
    }

    request(url, reqOpts, function(err, res, body) {
        if (err) reject(err);
        resolve(res);
    })
})
return newPromise
}