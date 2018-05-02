const fetch = require('../../util/fetch.js')
var request = require('request')

module.exports = async function() {
    var newPromise = new Promise(function(resolve, reject) {

        request('https://www.roblox.com/notification-stream/notification-stream-data', {method:"GET", jar:global.jar, headers:{'x-csrf-token': global.xcsrf}}, function(e, r, body) {
        if (e) reject(e);
        try {
        var json = JSON.parse(r.body);
        var myAccountId = json.CurrentUserId;
        resolve(myAccountId);
        } catch(err) {
            reject(err);
        }
    })

    /*
    fetch('https://www.roblox.com/notification-stream/notification-stream-data').then(res=>{

    
    var json = JSON.parse(res.body);
            var myAccountId = json.CurrentUserId;
            resolve(myAccountId);
        
    })*/
})
return newPromise
}