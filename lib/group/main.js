var getGroup = require('./funcs/getGroup.js')
var getAuditLogs = require('./funcs/getAuditLogs.js');
var getJoinRequests = require('./funcs/getJoinRequests.js');
var acceptJoinRequest = require('./funcs/acceptJoinRequest.js')
var getWall = require('./funcs/getWall.js')
var getRoles = require('./funcs/getRoles.js');
var setRank = require('./funcs/setRank.js')
var getRole = require('./funcs/getRole.js');
var deleteWallPost = require('./funcs/deleteWallPost.js');
var deleteWallPostsByUser = require('./funcs/deleteWallPostsByUser.js')
var groupShout = require('./funcs/shout.js');
var wallPost = require('./funcs/postOnWall.js')
var getUsersWithRank = require('./funcs/getUsersWithRank.js')
var exileUser = require('./funcs/exileUser.js');
var joinGroup = require('./funcs/joinGroup.js');

exports.onShout = require('./funcs/onShout.js')
exports.onWallPost = require('./funcs/onWallPost.js');
exports.onJoinRequest = require('./funcs/onJoinRequest.js');


exports.joinGroup = async function(...args) {
    return joinGroup(...args);
}
exports.deleteWallPost = async function(...args) {
    return deleteWallPost(...args);
}

exports.exileUser = async function(...args) {
    return exileUser(...args);
}

exports.deleteWallPostsByUser = async function(...args) {
    return deleteWallPostsByUser(...args)
}

exports.getUsersWithRank = async function(...args) {
    return getUsersWithRank(...args);
}

exports.shout = async function(...args) {
    return groupShout(...args)
}

exports.post = async function(...args) {
    return wallPost(...args);
}
exports.getRoles = async function (...args) {
    return getRoles(...args);
}
exports.getRole = async function (...args) {
    return getRole(...args);
}
exports.getWall = async function(...args) {
    return getWall(...args);
}

exports.setRank = async function(...args) {
    return setRank(...args);
}

exports.getGroup = async function(...args) {
    return getGroup(...args);
}



exports.getAuditLogs = async function(...args) {
    return getAuditLogs(...args);
}



exports.getJoinRequests = async function(...args) {
    return getJoinRequests(...args);
}


exports.acceptJoinRequest = async function(...args) {
    return acceptJoinRequest(...args);
}