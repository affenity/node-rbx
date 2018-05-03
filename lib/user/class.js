const userFuncs = require('./main.js')
const avatarClass = require('../avatar/class.js')
const assetClass = require('../asset/class.js')

const avatarFuncs = require('../avatar/main.js')
const assetFuncs = require('../asset/main.js');

class User {
    constructor(data) {
        this.userId =  new Number(data.UserId);
        this.username = new String(data.Username).toString();
        //this.previousNames = new Array(...data.PreviousNames);
        this.status = new String(data.Status).toString();
        this.blurb = new String(data.Blurb).toString();
        this.joinDate = new String(data.JoinDate).toString();
        this.accountAge = new Number(data.AccountAge);
        this.membership = new String(data.BC).toString();
    }


    async ownsAsset(assetId) {
        return await userFuncs.userOwnsAsset(this.userId, assetId);
    }

    async getFriends(page) {
        return await userFuncs.getFriends(this.userId, page);
    }


    async getNumFriends() {
        return Number(await userFuncs.numFriends(this.userId))
    }


    async canManageAsset(assetId) {
        return Boolean(await userFuncs.canManageAsset(this.userId, assetId));
    }


    async follow() {
        return userFuncs.followUser(this.userId);
    }

    async unfollow() {
        return userFuncs.unfollowUser(this.userId);
    }
    // AVATAR \\

    async getAvatar () {
        return new avatarClass.Avatar(await avatarFuncs.getAvatar(this.userId));
    }


    async getCurrentlyWearing () {
        return [].concat(await avatarFuncs.getCurrentlyWearing(this.userId)).map(x=>new avatarClass.AssetId(x));
    }


    async getOutfits (o) {
        return [].concat(await avatarFuncs.getOutfits(this.userId, o || {})).map(x=>new avatarClass.OutfitItem(x));
    }


    get onBlurbChange () {return userFuncs.onBlurbChange}

    get onStatusChange() {return userFuncs.onStatusChange}

}


class PartialUser {
    constructor(data) {
        // Available: Id, Username
        this.userId = new Number(data.UserId || data.Id || data.userId);
        this.username = new String(data.username || data.Username || data.Name || data.name).toString('utf8');
    }

    async getUser () {
        return new User(await userFuncs.getUserProfile(this.userId));
    }

}




class PartialGroupMember {
    constructor(data) {
        // Available: Id, Username, Role
        this.userId = new Number(data.UserId || data.Id || data.userId || data.id);
        this.username = new String(data.username || data.Username || data.Name || data.name).toString('utf8');
        this.role = new String(data.role || data.Role).toString('utf8')
    }

    
    async getUser () {
        return new User(await userFuncs.getUserProfile(this.userId));
    }
}


module.exports = {
    User : User,
    PartialUser : PartialUser,
    PartialGroupMember : PartialGroupMember
}







class MyArray extends Array {
    // Overwrite species to the parent Array constructor
    static get [Symbol.species]() { return Array; }
  }