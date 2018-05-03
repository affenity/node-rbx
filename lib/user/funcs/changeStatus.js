const post = require('../../util/strictpost.js')

module.exports = async function(newStatus) {
    var newPromise = new Promise(function(resolve, reject) {
        let url = `https://www.roblox.com/home/updatestatus`
        post(url, {inputs:{status:newStatus, sendToFacebook: false}}).then(res=>{
            if (res.statusCode!=200) {
                reject(`Failed to change status, status code: ${res.statusCode}, status message: ${res.statusMessage}`)
            } else {
                let json = JSON.parse(res.body);
                resolve(json.success==true);
            }
        }).catch(reject);
    })
    return newPromise;
}