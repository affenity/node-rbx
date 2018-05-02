// PLEASE NOTE THIS MODULE IS IN TESTING STAGES, IT WILL **NOT** BE WORKING 100%, NOR WILL IT ERROR ON ALL FUNCTIONS THAT REQUIRES YOU TO BE LOGGED IN!


// SEE https://roblox.ink/ FOR DOCUMENTATION AND EXAMPLES
// This is an example file where I've put in different actions and events so you can see how it looks like!
const nodeRbx = require('./index.js') //-- Note that you will do "node-rbx", I have to do ./index.js in this file!


const rbx = new nodeRbx({
    username:"Username",
    password:"Password",
    // or just the cookie:
    cookie: "COOKIE"
})

// You don't necessarily have to login to use some of the functions, but it is recommended, as you get more accurate dates, access to more functions etc.

rbx.login().then( () => {
    console.log(`Logged in as ${rbx.account.username}`); // -- Logs "Logged in as X"

    // Get a group by Id
    rbx.getGroup(3544434).then(group=>{

        // Recommended to check if the group is available before doing any functions that involves it
        if (group.available) {
            group.getJoinRequests().then(joinRequests=>{
                joinRequests.forEach(joinRequest=>{
                    joinRequest.acceptRequest().then( () => {
                        console.log(`Accepted ${joinRequest.username}'s join request!`)
                    })
                })
            })

            var wallPostStream = new group.onWallPost(group.id, {interval:2000})
            wallPostStream.on('posts', function(posts) {
                console.log(`Amount of new posts: ${posts.length}`)
                wallPostStream.stop();
            })
            var shoutStream = new group.onShout(group.id, {interval:2000});
            shoutStream.on('shout', function(newShout) {
                console.log("New shout in " + group.name);
            })
        }
    })
})