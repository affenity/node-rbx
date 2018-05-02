const post = require('../../util/post.js')
const cheerio = require('cheerio');
const groupClass = require('../class.js');

const getRoles = require('./getRoles.js')
const setRank = require('./setRank.js')
const getRankNameInGroup = require('./getRankNameInGroup.js');



module.exports = async function (groupId, userId, amount) {
    var newPromise = new Promise(async function (resolve, reject) {
        getRankNameInGroup(groupId, userId).then(rank=>{
            if (rank=='Guest') reject("Target user is not in group");
            getRoles(groupId).then(roles=>{
                for (var x=0;x<roles.length;x++) {
                    var role = roles[x];
                    var thisRank = role.Name;
                    if (thisRank==rank) {
                        var change = i + amount
                        var found = roles[change]
                        if (!found) {
                            reject("Rank change is out of range");
                        }

                        setRank(groupId, found.Id, userId).then(async s=>{
                            resolve(await new groupClass.GroupRole(found));
                        })
                    }
                }
            })
        })
    })
    return newPromise
}