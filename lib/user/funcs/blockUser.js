const fetch = require('../../util/fetch.js')
var request = require('request');


module.exports = async function(userId) {
    console.log("Block user called");
    var newPromise = new Promise(function(resolve, reject) {
        var url = `https://www.roblox.com/userblock/blockuser`
        
        request(url, {method:"POST", jar: global.jar, headers: {'x-csrf-token' : global.xcsrf}, form:{'blockeeId' : parseInt(userId)}}, function(e,r,b) {
            console.log(JSON.parse(r.body));
        })
    })
    return newPromise;
}