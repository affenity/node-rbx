const fetch = require('../../util/fetch.js')



module.exports = async function (userId, assetId) {

    var newPromise = new Promise(function(resolve, reject) {

        var url = `https://api.roblox.com/users/${userId}/canmanage/${assetId}`
        fetch(url).then(res=>{
            var json = JSON.parse(res.body);
                var success = json.Success,
                CanManage   = json.CanManage;
                if (!success || CanManage==null) reject("Invalid arguments, please make sure they are correct and try again");
                resolve(CanManage);
            
        }).catch(reject);

    })
    return newPromise
}