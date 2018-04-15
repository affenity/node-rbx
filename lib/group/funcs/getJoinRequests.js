const fetch = require('../../util/fetch.js')
const getToken = require('../../util/gettoken.js')
const cheerio = require('cheerio');


module.exports = async function(groupId) {
    var newPromise = new Promise(function(resolve, reject) {

        getToken('https://api.roblox.com/sign-out/v1').then(tok=>{
            var headers = tok.headers;
            console.log(headers);
        })
        var url = `https://www.roblox.com/groups/${groupId}/joinrequests-html`
        fetch(url).then(res=>{
            var body = res.body;

            var requests = [];
            var $ = cheerio.load(body);
            var found = $('#JoinRequestsList').find('tr');

            if (found.length<=1) return resolve([]);

            for (var num = 0; num < found.length; num++) {
                var req = found.eq(num).find('td');
                if (req.eq(1).text().length>2) {
                requests.push({
                    username: req.eq(1).text(),
                    userId: String(req.eq(1).find('a').attr('href')).toString('utf8').match(/users\/(.*?)\/profile/)[1],
                    date: req.eq(2).text(),
                    requestId : Number(req.eq(3).find('span').attr('data-rbx-join-request')),
                    groupId : Number(groupId)
                })
            }
                
            }

            resolve(requests);
           

        
        })
    })
    return newPromise
}
