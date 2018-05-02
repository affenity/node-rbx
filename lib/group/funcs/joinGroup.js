const fetch = require('../../util/fetch.js')
const cheerio = require('cheerio');
const request = require('request');

module.exports = async function(groupId) {
    var newPromise = new Promise(function(resolve, reject) {

        var events = {
            __EVENTTARGET: 'JoinGroupDiv',
            __EVENTARGUMENT: 'Click'
        }

        request('https://www.roblox.com/Groups/Group.aspx?gid='+groupId, {jar: global.jar, events: })
    })
}