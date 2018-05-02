const request = require('request')

module.exports = async function(url, opts) {
    var newPromise = new Promise(function(resolve, reject) {
        request(url, { method: "POST", followAllRedirects: true, followRedirect: (redi) => { }, jar: global.jar, headers: { 'x-csrf-token': global.xcsrf }, form: opts.inputs }, function (e, res, body) {
            if (e) reject(e);
            resolve(res);
        })
    })
    return newPromise
}