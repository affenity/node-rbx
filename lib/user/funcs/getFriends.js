const fetch = require('../../util/fetch.js')
const userClass = require('../class.js')

module.exports = async function(userId, page) {
    var newPromise = new Promise(function(resolve, reject) {
       var url = `https://api.roblox.com/users/${userId}/friends${page!=null? "?page=" + page : ''}`
    fetch(url).then(res=>{
            var json = JSON.parse(res.body);
        
            var startArray = []
            var allArray = startArray.concat(json);

            var resultsArray = []
            
            for (num in allArray) {
                var friend = allArray[num];
                resultsArray.push(friend);
            }
            
            return resolve(resultsArray);
        
    }) 
    })
    return newPromise
}