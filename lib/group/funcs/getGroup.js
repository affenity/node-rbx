const fetch = require('../../util/fetch.js')



module.exports = async function(groupId) {
    var newPromise = new Promise(function(resolve, reject) {
        var url = `https://groups.roblox.com/v1/groups/${groupId}`
        fetch(url).then(res=>{
            var json = JSON.parse(res.body);

                var id = json.id;
                if (!id) return reject("Failed to get group, invalid id");
                resolve(json);
            
        }).catch(reject);
    })
    return newPromise
}