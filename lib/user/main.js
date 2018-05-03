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
var changeStatus = require('./funcs/changeStatus.js');
var changeBlurb = require('./funcs/changeBlurb.js');
var friendUser = require('./funcs/friendUser.js');
var unfriendUser = require('./funcs/unfriendUser.js');
var isFollowing = require('./funcs/isFollowing.js');
var getFollowers = require('./funcs/getFollowers.js');
var getFollowings = require('./funcs/getFollowings.js');
var getUserGroups = require('./funcs/getUserGroups.js');
var isFriends = require('./funcs/isFriends.js');
var isNameTaken = require('./funcs/isNameTaken.js');
var getUserPlaces = require('./funcs/getUserPlaces.js');
var getUserRobloxBadges = require('./funcs/getUserRobloxBadges.js');
var getUserPrimaryGroup = require('./funcs/getUserPrimaryGroup.js');
//var onBlurbChange = require('./funcs/onBlurbChange.js');



const userClass = require('./class.js');

exports.onBlurbChange = require('./funcs/onBlurbChange.js');
exports.onStatusChange = require('./funcs/onStatusChange.js');


exports.getUserPrimaryGroup = async function(...args) {
    return getUserPrimaryGroup(...args);
}
exports.getUserRobloxBadges = async function(...args) {
    return getUserRobloxBadges(...args);
}
exports.getUserPlaces = async function(...args) {
    return getUserPlaces(...args);
}
exports.isNameTaken = async function(...args) {
    return isNameTaken(...args);
}
exports.isFriends = async function(...args) {
    return isFriends(...args);
}
exports.getUserGroups = async function(...args) {
    return getUserGroups(...args);
}
exports.getFollowing = async function(...args) {
    return getFollowings(...args);
}
exports.getFollowers = async function(...args) {
    return getFollowers(...args);
}

exports.isFollowing = async function (...args) {
    return isFollowing(...args);
}

exports.sendFriendRequest = async function(...args) {
    return friendUser(...args);
}

exports.unfriendUser = async function(...args) {
    return unfriendUser(...args);
}

exports.changeBlurb = async function(...args) {
    return changeBlurb(...args);
}
exports.changeStatus = async function (...args) {
    return changeStatus(...args);
}
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