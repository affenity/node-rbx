const request = require('request');

module.exports = async function(url, opts) {
    var newPromise = new Promise(function(resolve, reject) {
        opts = opts || {}

        url = url || opts.url;
    var reqOpts = {
        method : opts.method || "GET",
        followAllRedirects: false,
        followRedirect: (r) => {
            
        },
        headers: {
            'x-csrf-token' : global.xcsrf
        },
        
        body : opts.body || null,
        json : opts.json || false,
        form : opts.form || null,
        jar: global.jar,
    }

    reqOpts.headers = reqOpts.headers||{};

    
    request(url, reqOpts, async function(err, res, body) {
        if (err) reject(err);
        resolve(res);
    })
})
return newPromise;
}