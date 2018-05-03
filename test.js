const n = require('./index.js');

const rbx = new n({
    username:"username",
    password:"password"
})


var groups = [3544434, 3137360, 2616375, 3217670, 2633056, 2627479, 3295419, 794849, 3020290, 3232454, 3240001, 2800004, 3295424,
2725354, 3241687, 2824188, 3527030, 3295425]



rbx.login().then( () => {
    
    var blurbEvent = new rbx.account.onBlurbChange(rbx.account.userId);
    var statusEvent = new rbx.account.onStatusChange(rbx.account.userId);
    blurbEvent.on('change', function(newBlurb, oldBlurb) {
        console.log(`${rbx.account.username} has changed blurb from ${oldBlurb} to ${newBlurb}`)
    })
    statusEvent.on('change', function(newStatus, oldStatus) {
        console.log(`${rbx.account.username} changed status to ${newStatus} from ${oldStatus}`)
    })
    
    rbx.isFriends(18442032, 200646049).then(r=>{
        console.log(r);
    })

    rbx.isNameTaken('pdaoiwawpodkwapokdawpokdawpkdpao').then(nameTaken=>{
        console.log(`Name taken: ${nameTaken}`)
    })

    rbx.GetUserByName('krislayer').then(user=>{
        
    })
    /*for (var i=0;i<groups.length;i++) {
        let group = groups[i];
        console.log(group)
        rbx.getGroup(group).then(groupC=>{
            console.log(`Listening to posts and shouts for ${groupC.name}`)
            var onWallPost = new groupC.onWallPost(group.id);
            var onShout = new groupC.onShout(group.id);
            onWallPost.on('posts', function(posts) {
                console.log(`New posts in ${groupC.name}\nAmount: ${groupC.name}`)
            })
            onShout.on('shout', function(shout) {
                console.log(`New shout in ${groupC.name}`)
                console.log(shout);
            })
        })
    }*/
    groups.forEach(groupId=>{
        rbx.getGroup(groupId).then(group=>{
            var onWallPost = new group.onWallPost(group.id);
            var onShout = new group.onShout(group.id);
            onWallPost.on('posts', function (posts) {
                console.log(`New posts in ${group.name}\nAmount: ${posts.length}`)
                console.log(posts)
            })
            onShout.on('shout', function (shout) {
                console.log(`New shout in ${group.name}`)
                console.log(shout);
            })
        })
    })
})