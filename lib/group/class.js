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

    /**
     * Gets the group's current join requests
     */
    async getJoinRequests() {
        return [].concat(await groupFuncs.getJoinRequests(this.id)).map(x=>new JoinRequest(x));
    }

    /**
     * Gets the group's wall of messages
     */
    async getWall() {
        return [].concat(await groupFuncs.getWall(this.id)).map(x=>new WallPost(x, this))
    }

    /**
     * Gets all the roles in a group
     */
    async getRoles() {
        return [].concat(await groupFuncs.getRoles(this.id)).map(x=>new GroupRole(x, this.id));
    }

    /**
     * Get a role in the group with specified search terms
     * @param {Object} args Search filter, either rank, name, or id 
     */
    async getRole(args) {
        return new GroupRole(await groupFuncs.getRole(this.id, args), this.id);
    }

    /**
     * Posts a shout on the group
     * @param {String} message The message to send (max. 500 characters)
     */
    async postShout(message) {
        return groupFuncs.shout(this.id, message);
    }
    
    /**
     * Posts a message on the wall
     * @param {String} message The message to send
     */
    async postOnWall(message) {
        return groupFuncs.post(this.id, message);
    }

    /**
     * Ranks a user
     * @param {Integer} roleId The id of the role to rank the user as 
     * @param {*} userId The id of the user to rank
     */
    async setRank(roleId, userId) {
        return Boolean(await groupFuncs.setRank(this.id, roleId, userId));
    }
    

    /**
     * Removes all messages from this user in the group
     * @param {Integer} userId The user to remove all messages from
     */
    async deleteWallPostsByUser(userId) {
        return Boolean(await groupFuncs.deleteWallPostsByUser(this.id, userId))
    }

    /**
     * 
     * @param {Integer} roleId Gets a list of members with that specified role, limited to 100
     */
    async getUsersWithRank(roleId) {
        return [].concat(await groupFuncs.getUsersWithRank(this.id, roleId)).map(x=>new userClass.PartialUser(x));
    }

    /**
     * Exiles a user from the group
     * @param {Integer} userId The id of the user to exile/kick from the group
     */
    async exileUser(userId) {
        return groupFuncs.exileUser(this.id, userId);
    }

    /**
     * Joins the group with the authenticated user
     */
    async joinGroup() {
        return groupFuncs.joinGroup(this.id);
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

    get onJoinRequest() {return groupFuncs.onJoinRequest}
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
        this.groupId = group//(group!=null?typeof group =='number'?group:group.id||group.Id:null)
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


class PartialGroupRole {
    constructor(name, groupId) {
        this.name = name;
        this.groupId = groupId;
    }

    async getFullRole() {
        groupFuncs.getRole(this.groupId, {name:this.name})
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



class UserGroup {
    constructor(data) {
        this.Id = Number(data.id || data.Id);
        this.Name = String(data.Name).toString('utf8');
        this.EmblemId = Number(data.EmblemId);
        this.EmblemUrl = String(data.EmblemUrl).toString('utf8');
        this.Rank = Number(data.Rank);
        this.Role = new PartialGroupRole(this.Role, this.Id);
        this.IsInClan = Boolean(data.IsInClan);
        this.IsPrimary = Boolean(data.IsPrimary);
    }   
}

module.exports = {
    Group : Group,
    GroupShout : Shout,
    WallPost : WallPost,
    GroupRole : GroupRole,
    JoinRequest:JoinRequest,
    UserGroup: UserGroup
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