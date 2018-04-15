const fetch = require('../../util/fetch.js')


module.exports = async function() {
    var newPromise = new Promise(function(resolve, reject) {

    
    fetch('https://www.roblox.com/notification-stream/notification-stream-data').then(res=>{

    var json = JSON.parse(res.body);
            var myAccountId = json.CurrentUserId;
            resolve(myAccountId);
        
    })
})
return newPromise
}