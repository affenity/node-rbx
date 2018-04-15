var getGroup = require('./funcs/getGroup.js')
var getAuditLogs = require('./funcs/getAuditLogs.js');
var getJoinRequests = require('./funcs/getJoinRequests.js');
var acceptJoinRequest = require('./funcs/acceptJoinRequest.js')



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