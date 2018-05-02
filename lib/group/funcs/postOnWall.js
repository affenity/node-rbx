const post = require('../../util/strictpost.js')
const getVerification = require('../../util/getVerification.js')


module.exports = async function (groupId, message) {

    var newPromise = new Promise(function (resolve, reject) {
        getVerification(`https://www.roblox.com/My/Groups.aspx?gid=${groupId}`).then(response => {

            var events = {
                ctl00$cphRoblox$GroupWallPane$NewPost: message,
                ctl00$cphRoblox$GroupWallPane$NewPostButton: 'Post'
            };

            var url = `https://www.roblox.com/My/Groups.aspx?gid=${groupId}`

            var inputs = response.inputs;
            let allInputs = Object.assign(inputs, events)

            global.jar.setCookie(response.header, 'https://www.roblox.com/')

            post(url, { inputs: inputs }).then(res => {
                if (res.statusCode == 200) {
                    resolve(true)
                } else reject("Shout failed, verify login, permissions, and message")
            }).catch(reject);

        })



    })
    return newPromise
}