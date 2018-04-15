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
}



class Shout {
    constructor(shout) {
        this.available = Boolean(shout!=null);
        if (!this.available) return;
        this.body = String(shout.body || shout.Body).toString('utf8');
        this.poster = new userClass.PartialUser(shout.poster);
        this.created = new Date(shout.created || shout.Created);
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
    GroupShout : Shout
}