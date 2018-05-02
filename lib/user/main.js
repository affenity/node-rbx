var getIdFromUsername = require('./funcs/getIdFromUsername')
var getUsernameFromId = require('./funcs/getUsernameFromId.js')
var getUserProfile = require('./funcs/getUserProfile.js')
var userOwnsAsset = require('./funcs/ownsAsset.js')
var getFriends = require('./funcs/getFriends.js');
var numFriends = require('./funcs/numFriends.js');
var getCurrency = require('./funcs/getCurrency.js');
const selfAuthenticate = require('./funcs/authenticate.js');
var acceptFriendRequest = require('./funcs/acceptFriendRequest.js')
var declineFriendRequest = require('./funcs/declineFriendRequest.js');
var canManageAsset = require('./funcs/canManageAsset.js');
var blockUser = require('./funcs/blockUser.js')
var unblockUser = require('./funcs/unblockUser.js');
var followUser = require('./funcs/followUser.js')
var unfollowUser = require('./funcs/unfollowUser.js');
var messageUser = require('./funcs/messageUser.js');



const userClass = require('./class.js');

exports.getIdFromUsername = async function(...args)  {
    return getIdFromUsername(...args);
}

exports.getUsernameFromId = async function(...args) {
    return getUsernameFromId(...args);
}

exports.getUserProfile = async function (...args) {
    return getUserProfile(...args);
}


exports.userOwnsAsset = async function (...args) {
    return userOwnsAsset(...args);
}


exports.getFriends = async function (...args) {
    return [].concat( await getFriends(...args)).map(x=>new userClass.PartialUser(x));
}


exports.numFriends = async function (...args) {
    return numFriends(...args);
}


exports.getCurrency = async function (...args) {
    return getCurrency(...args);
}


exports.authenticateSelf = async function() {
    return selfAuthenticate();
}


exports.acceptFriendRequest = async function (...args) {
    return acceptFriendRequest(...args);
}

exports.declineFriendRequest = async function(...args) {
    return declineFriendRequest(...args);
}

exports.canManageAsset = async function(...args) {
    return canManageAsset(...args);
}


exports.blockUser = async function(...args) {
    return blockUser(...args)
}

exports.unblockUser = async function(...args) {
    return unblockUser(...args);
}


exports.followUser = async function(...args) {
    return followUser(...args);
}


exports.unfollow = async function(...args) {
    return unfollowUser(...args);
}
exports.MessageUser = async function(...args) {
    return messageUser(...args);
}