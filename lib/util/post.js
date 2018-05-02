const request = require('request')

module.exports = async function(url, opts) {
    var newPromise = new Promise(function(resolve, reject) {
        opts = opts || {}
        /*
        if (opts.RequestVerificationToken) {
            global.jar.setCookie(`__RequestVerificationToken=${opts.RequestVerificationToken}`, 'https://www.roblox.com/')
        }*/
        //'__RequestVerificationToken=':opts.RequestVerificationToken
        var cOpts = { method: opts.method || "POST", followAllRedirects: true, followRedirect: (redi) => { }, json: opts.json || {}, jar: global.jar, headers: { 'x-csrf-token': global.xcsrf }, form: opts.form || {} }
         
        request(url, cOpts, function(e,r,b) {
        if (e) reject(e);
        resolve(r);
    })

})
return newPromise
}