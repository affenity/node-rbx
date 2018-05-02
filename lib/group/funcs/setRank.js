const post = require('../../util/post.js')



module.exports = async function (groupId, roleId, userId) {
    var newPromise = new Promise(function (resolve, reject) {
        var url = `https://www.roblox.com/groups/api/change-member-rank?groupId=${groupId}&newRoleSetId=${roleId}&targetUserId=${userId}`
        post(url).then(res => {
            var json = res.body
            if (res.statusCode==200) {
                if (!json.success) reject('Invalid permissions, make sure the authenticated user is in the group and has permissions to change the rank of the target!')
            resolve(true);
            } else {
                reject("Make sure the request is valid, internal error");
            }
        }).catch(reject);
    })
    return newPromise
}