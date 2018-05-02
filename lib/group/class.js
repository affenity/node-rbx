const userClass = require('../user/class.js');
const groupFuncs = require('./main.js');

class Group {
    constructor(data) {
        this.available = Boolean(data!=null);
        if (!this.available) return;
        this.id = Number(data.id);
        this.name = String(data.name || data.Name).toString('utf8');
        this.description = String(data.description || data.Description).toString('utf8');
        this.owner = new userClass.PartialUser(data.owner || data.Owner);
        this.shout = new Shout(data.shout || data.Shout);
        this.memberCount = Number(data.memberCount || data.MemberCount);
    }



    async getAuditLogs (o) {
        return [].concat(await groupFuncs.getAuditLogs(this.id)).map(x=>new AuditLog(x));
    }

    async getJoinRequests() {
        return [].concat(await groupFuncs.getJoinRequests(this.id)).map(x=>new JoinRequest(x));
    }

    async getWall() {
        return [].concat(await groupFuncs.getWall(this.id)).map(x=>new WallPost(x, this))
    }

    async getRoles() {
        return [].concat(await groupFuncs.getRoles(this.id)).map(x=>new GroupRole(x, this.id));
    }

    async getRole(args) {
        return new GroupRole(await groupFuncs.getRole(this.id, args), this.id);
    }

    async postShout(message) {
        return groupFuncs.shout(this.id, message);
    }

    async postOnWall(message) {
        return groupFuncs.post(this.id, message);
    }

    async setRank(roleId, userId) {
        return Boolean(await groupFuncs.setRank(this.id, roleId, userId));
    }

    async deleteWallPostsByUser(userId) {
        return Boolean(await groupFuncs.deleteWallPostsByUser(this.id, userId))
    }

    async getUsersWithRank(roleId) {
        return [].concat(await groupFuncs.getUsersWithRank(this.id, roleId)).map(x=>new userClass.PartialUser(x));
    }

    /**
     * @param {settings} [settings] The settings (*optional*)
     * @param settings.interval The interval to check (in ms)
     * @example group.onShout({interval:2000}).then(stream=>{
     *      stream.on('shout', function(shout) {
     *          
     *      })
     * }) 
     * 
     */
    get onShout () {return groupFuncs.onShout}

    get onWallPost() {return groupFuncs.onWallPost}/* (settings) {
        return groupFuncs.onWallPost//(this.id, settings);
    }*/
}


/**
 * @param Shout#created
 * DOES NOT WORK
 */
class Shout {
    constructor(shout) {
        this.available = Boolean(shout!=null);
        if (!this.available) return;
        this.body = String(shout.body || shout.Body).toString('utf8');
        this.poster = new userClass.PartialUser(shout.poster);
        //this.created = new Date(shout.created || shout.Created);
    }
}



class AuditLog {
    constructor(data) {
        this.available = Boolean(data!=null&&data.date!=null);
        if (!this.available) return;
        this.user = new userClass.PartialGroupMember(data.user);
        this.description = String(data.text).toString('utf8');
        this.action = new AuditLogAction(data.action);
        this.date = new Date(data.date);
    }
}

class WallPost {
    constructor(data, group) {
        this.id = data.id || data.Id;
        this.poster = new userClass.PartialUser(data.poster)
        this.body = String(data.body).toString('utf8');
        this.created = new Date(data.created);
        this.updated = new Date(data.updated);
        this.groupId = group.id||group.Id||group
    }


    delete() {
        return groupFuncs.deleteWallPost(this.groupId, this.id);
    }

    deleteAllPostsByUser() {
        return groupFuncs.deleteWallPostsByUser(this.groupId, this.poster.userId)
    }
}


class GroupRole {
    constructor(data, groupId) {
        this.Id = Number(data.Id);
        this.Name = String(data.Name).toString('utf8');
        this.Rank = Number(data.Rank);
        this.groupId = groupId
    }


    /**
     * Not working yet, do not use
     */
    async getUsersWithRank() {
        return [].concat(await groupFuncs.getUsersWithRank(this.groupId, this.Id)).map(x=>new userClass.PartialUser(x));
    }
}


class AuditLogAction {
    constructor(data) {
        this.available = Boolean(data.target!=null);
        if (!this.available) return;
        this.target = Number(data.target);
        this.params = [].concat(data.params);

    }
}


class JoinRequest {
    constructor(data) {
        this.available = Boolean(data!=null&&data.username!=null&&data.userId!=null);
        if (!this.available) return;
        this.username = String(data.username).toString('utf8');
        //this.backupId = data.userid;
        this.userId = Number(data.userId)//parseInt(data.userid.match(/users\/(.*?)\/profile/)[1])
        this.date = new Date(data.date);
        this.requestId = Number(data.requestId);
        this.groupId = Number(data.groupId);
    }


    async acceptRequest() {
        return groupFuncs.acceptJoinRequest(this.requestId)
    }


    async declineRequest() {
        return groupFuncs.declineJoinRequest(this.requestId);
    }
}

module.exports = {
    Group : Group,
    GroupShout : Shout,
    WallPost : WallPost,
    GroupRole : GroupRole
}

function isDST (time) {
    var today = new Date(time);
    var month = today.getMonth();
    var dow = today.getDay();
    var day = today.getDate();
    var hours = today.getHours();
    if (month < 2 || month > 10) {
        return false;
    }
    if (month > 2 && month < 10) {
        return true;
    }
    if (dow === 0) {
        if (month === 2) {
            if (day >= 8 && day <= 14) {
                return hours >= 2;
            }
        } else if (month === 10) {
            if (day >= 1 && day <= 7) {
                return hours < 2;
            }
        }
    }
    var previousSunday = day - dow;
    if (month === 2) {
        return previousSunday >= 8;
    }
    return previousSunday <= 0;
};

function getDate(args) {
    var time = args.time;
    var timezone = args.timezone || 'CT';
    return new Date(time + ' ' + timezone.substring(0, 1) + (isDST(time) ? 'D' : 'S') + timezone.substring(1))
}