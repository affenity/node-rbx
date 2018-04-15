const fetch = require('../../util/fetch.js')



module.exports = async function (userId, opts) {
    opts = opts || {}
    var page = opts.page || null;
    var maxResultsPerPage = opts.maxResultsPerPage || 20;

    var newPromise = new Promise(function(resolve, reject) {

        var url = `https://avatar.roblox.com/v1/users/${userId}/outfits`
        fetch(url).then(res=>{
            var json = JSON.parse(res.body);

                var data = json.data;
                if (!data) reject("Failed to get data");

                resolve(data);
            
        }).catch(reject);
    })
    return newPromise
}