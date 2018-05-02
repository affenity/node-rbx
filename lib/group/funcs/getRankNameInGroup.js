//http://www.roblox.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&playerid=18442032&groupId=3544434
const fetch = require('../../util/fetch.js')



module.exports = async function (groupId, userId) {
    var newPromise = new Promise(function (resolve, reject) {
        var url = `http://www.roblox.com/Game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&playerid=${userId}&groupId=${groupId}`
        fetch(url).then(res => {
            if (res.statusCode!=200) {
                reject("Bad Request");
            } else resolve(res.body);
        }).catch(reject);
    })
    return newPromise
}
