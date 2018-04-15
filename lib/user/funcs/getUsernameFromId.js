const fetch = require('../../util/fetch.js')



module.exports = async function (id) {
    var newPromise = new Promise(function(resolve, reject) {
        fetch(`https://api.roblox.com/users/${id}`, {headers:{'Cookie' : `.ROBLOSECURITY=${process.env.Cookie}`}}).then(async res=>{
        
            var json = JSON.parse(res.body); 
            var name = json.Username;
            var errorMessage = json.errorMessage;
            var message = json.message;
            if (name) {
                return resolve(name);
            } else {
                return reject(errorMessage||message);
            }

        })
        })
    return newPromise
}