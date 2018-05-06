// SEE https://roblox.ink/ FOR DOCUMENTATION

const userFuncs = require('./lib/user/main.js')
const userClass = require('./lib/user/class.js')

const assetFuncs = require('./lib/asset/main.js')
const assetClass = require('./lib/asset/class.js')

const avatarFuncs = require('./lib/avatar/main.js')
const avatarClass = require('./lib/avatar/class.js')

const groupFuncs = require('./lib/group/main.js')
const groupClass = require('./lib/group/class.js')


const request = require('request')
const parser = require('cheerio')
const fs = require('fs');

const robloxFetch = require('./lib/util/fetch.js');


const get_xcsrf = require('./lib/util/xcsrf.js')
const post_req = require('./lib/util/post.js')


global.Shouts = {};
global.Walls = {};
global.JoinRequests = {};
global.Blurbs = {};
global.Statuses = {};


class RobloxApi {
    
    /**
     * Initialises the node-rbx module, you must provide the settings to log in with here, or in the .login() function
     * @param {settings} settings (Optional)
     * @example var rbx = new nodeRbx({
     *      username : 'Username',
     *      password : 'Password'
     * })
     * @example var rbx = new nodeRbx()
     */
    constructor(settings) {
        settings = settings || {}
        this.settings = settings;
        this.account = null;
        this.authenticated = false;
        var jar = request.jar()
        global.jar = jar;
    }   





    /**
     * Logs in to the user with either username and password (cookie does NOT work *yet*)
     * @param {Optional} s The settings to log in with (optional)
     * @see https://roblox.ink/docs
     * @example rbx.login({username: 'UsernameHere', password: 'PasswordHere'}).then( () => {console.log("Logged in")})

     */
    async login(s) {
        if (this.authenticated==true) return false;
        s = s || this.settings
        if (!s) throw new Error("No credentials provided");
        var waitLogin = new Promise(async function(resolve, reject) {
            
            var url = 'https://www.roblox.com/newlogin';
            var post = {
              username: s.username,
              password: s.password
            };

            
            if (s.username && s.password && !s.cookie) {
              request(url, {method:"POST", body: post, json:true, jar: global.jar, followAllRedirects:true, followRedirect:(resp) => {}}, async function(err, res, body) {
                if (err) throw new Error(err);
               // console.log(res.statusCode);
                if (res.statusCode === 302) {
                    
                      var cookies = res.headers['set-cookie']; // If the user is already logged in a new cookie will not be returned.
                      if (cookies) {
                        var session = cookies.toString().match(/\.ROBLOSECURITY=(.*?);/)[1];

                        await get_xcsrf()
                        if (global.xcsrf) {
                            resolve(true);
                        } else reject("FAILED TO AUTHENTICATE")
                      } else {
                          reject("Couldn't find cookies")
                      }
                    
                  } else {
                    var errors = [];
                    if (res.statusCode !== 302) {
                      var list = parser.load(body)('.validation-summary-errors').find('li');
                      for (var i = 0; i < list.length; i++) {
                        var err = list.eq(i).text();
                        if (err.indexOf('Nice to meet you') > -1) {
                          err = 'User does not exist';
                        } else if (err.indexOf('robot') > -1) {
                          err = 'Captcha';
                        }
                        errors.push(err);
                      }
                    } else if (res.headers.location.startsWith('/login/twostepverification')) {
                      errors.push('Two step verification is not supported');
                    } else {
                      reject('Login failed, unknown redirect: ' + res.headers.location);
                    }
                    reject('Login failed, known issues: ' + JSON.stringify(errors));
                  }
                
              }) } else if (s.cookie!=null) {
                  var sC = '.ROBLOSECURITY='+s.cookie;
                  global.cookies = sC;
                var roCookie = request.cookie('.ROBLOSECURITY='+s.cookie)
                global.jar.setCookie(roCookie, 'https://www.roblox.com/')

                request('https://www.roblox.com/home', {method:"GET", jar: global.jar, followAllRedirects:true, followRedirect:(resp) => {console.log("LOC: " +resp.headers.location)}}, async function(err, res, body) {
                    //console.log(res.request.headers)   
                var $=parser.load(res.body);
                  // console.log("VAL : "  + $('.home-header-content').text())
                   
                    await get_xcsrf();
                    if (global.xcsrf) {
                        resolve(true)
                    } else reject("FAILED TO AUTHENTICATE")   
                })
                /*
                await get_xcsrf()
                        if (global.xcsrf) {
                            resolve(true);
                        } else reject("FAILED TO AUTHENTICATE")
*/

                      } else {
                          throw new Error("Couldn't find cookies")
                      }


                    

               
              


        })

        var couldLogin = await waitLogin;
        if (couldLogin!=true) return couldLogin;
        var isAuthenticated = await this.authenticate();
        return true 
        // Return waitLogin
    }


    /**
     * Please do not use this function, this is for the module only
     * Attempting to use it will cause an error
     */
    async authenticate() {
        var isAuthenticated = await userFuncs.authenticateSelf();
        if (isAuthenticated==false || isAuthenticated==null) {
            throw new Error("Failed to authenticate, please make sure you have provided correct credentials")
        } else {
            this.account = await new userClass.User(await userFuncs.getUserProfile(isAuthenticated));
            this.authenticated = true
            return true;
        }
    }


    // USERS \\
    
    /**
     * Returns a class User from the Id
     * @param {userId} id User id 
     * @returns Promise <Class User>
     * @see https://roblox.ink/classes#user
     */
    async GetUserById (id) {
        return new userClass.User(await userFuncs.getUserProfile(id));
    }


    /**
     * Returns a class User from given username
     * @param {Username} name Username
     * @returns Promise <Class User>
     * @see https://roblox.ink/classes#user
     */
    async GetUserByName (name) {
        return new userClass.User(await userFuncs.getUserProfile( await userFuncs.getIdFromUsername(name)));
    }


    /**
     * Gets the authenticated user's amount of Robux
     * @returns Promise <Number>
     */
    async getRobux() {
        if (!this.authenticated) throw new Error("Not authenticated");
        return Number( await userFuncs.getCurrency());
    }


    /**
     * Accepts the user's friend request
     * @param {userId} targetId The user to accept the friend request from
     * @returns Promise <Boolean>
     */
    async acceptFriendRequest(targetId) {
        if (!this.authenticated) throw new Error("Not authenticated")
        return userFuncs.acceptFriendRequest(this.account.userId, targetId);
    }


    /**
     * Declines the friend request from the user
     * @param {userId} targetId The user to decline the friend request from
     * @returns Promise <Boolean>
     */
    async declineFriendRequest(targetId){
        if (!this.authenticated) throw new Error("Not authenticated");
        return userFuncs.declineFriendRequest(this.account.userId, targetId);
    }

    /**
     * Checks if the user can manage the certain asset
     * @param {userId} userId User id 
     * @param {assetId} assetId AssetId
     * @returns Promise <Boolean>
     */
    async canManageAsset (userId, assetId) {
        return Boolean(await userFuncs.canManageAsset(userId, assetId))
    }


    /**
     * Checks if the user owns the asset
     * @param {userId} userId User's id
     * @param {assetId} assetId Asset id
     * @returns Promise <Boolean>
     */
    async ownsAsset (userId, assetId) {
        return Boolean(await userFuncs.userOwnsAsset(userId, assetId));
    }
    

    /**
     * Blocks the user with given id
     * @param {userId} userId User's id
     */
    async BlockUser (userId) {
        if (!this.authenticated) throw new Error("Not authenticated");
        return userFuncs.blockUser(userId)
    }


    /**
     * Unblocks the user with the given id
     * @param {userId} userId User's id
     */
    async UnblockUser(userId) {
        if (!this.authenticated) throw new Error("Not authenticated");
        return userFuncs.unblockUser(userId);
    }


    /**
     * Follows a user (You have to be authenticated)
     * @param {UserId} userId User Id
     * @returns Promise <Boolean>
     * @example rbx.FollowUser(1).then( () => {
     *      console.log("Followed user")
     * })
     */
    async FollowUser(userId) {
        if (!this.authenticated) throw new Error("Not authenticated");
        return Boolean(await userFuncs.followUser(userId))
    }


    /**
     * Unfollows a user (You have to be authenticated)
     * @param {userId} userId User's id
     * @returns Promise <Boolean>
     * @example rbx.UnfollowUser(1).then( () => {
     *      console.log("Unfollow user");
     * })
     */
    async UnfollowUser(userId) {
        if (!this.authenticated) throw new Error("Not authenticated");
        return Boolean(await userFuncs.unfollow(userId))
    }



    /**
     * Messages a user on Roblox (watch out for Captcha)
     * @param {userId} userId The user to message
     * @param {settings} opts The settings ( {subject, body} )
     * @returns Promise <Boolean>
     * @example rbx.MessageUser(1, {subject:'Hello Roblox', body: 'How are you?'}).then(()=>{ console.log("Sent message!")})
     */
    async MessageUser (userId, opts) {
        if (!this.authenticated) throw new Error("Not authenticated");
        return Boolean(await userFuncs.MessageUser(userId, opts));
    }

    /**
     * Changes the authenticated user's status
     * @param {String} newStatus The new status
     */
    async changeStatus(newStatus) {
        return Boolean(await userFuncs.changeStatus(newStatus));
    }


    /**
     * 
     * @param {String} newBlurb The new blurb
     */
    async changeBlurb(newBlurb) {
        return Boolean(await userFuncs.changeBlurb(newBlurb));
    }


    /**
     * Send a friend request to a user
     * @param {Number} userId The user to send friend request to
     */
    async sendFriendRequest(userId) {
        return userFuncs.sendFriendRequest(userId);
    }


    /**
     * Unfriend a user
     * @param {Number} userId The id of the user to unfriend
     */
    async unfriendUser (userId) {
        return userFuncs.unfriendUser(userId);
    }


    /**
     * Checks if a user is being followed by another user
     * @param {Number} userId The user potentially being followed
     * @param {Number} targetId The user potentially following the other user
     */
    async userIsFollowing(userId, targetId) {
        return userFuncs.isFollowing(userId, targetId);
    }


    /**
     * Gets the followers following authenticated account, or specified userId
     * @param {Number} userId The id of the user to get the followers from
     */
    async getFollowers(userId) {
        return [].concat(await userFuncs.getFollowers(userId||this.account.userId)).map(x=>new userClass.PartialUser(x));
    }

    /**
     * Gets the users the authenticated user is following
     */
    async getFollowing() {
        return [].concat(await userFuncs.getFollowing()).map(x=>new userClass.PartialUser(x));
    }




    /**
     * Gets the authenticated user's groups or user specified with userId
     * @param {Number} userId The id of the user to get their groups 
     */
    async getUserGroups(userId) {
        return [].concat(await userFuncs.getUserGroups(userId||this.account.userId)).map(x=>new groupClass.UserGroup(x));
    }


    /**
     * Checks if a name is taken
     * @param {String} name Name to check
     */
    async isNameTaken(name) {
        return Boolean(await userFuncs.isNameTaken(name));
    }
    


    /**
     * Checks if two users are friends
     * @param {Number} userId1 Id of one user
     * @param {Number} userId2 Id of other user
     */
    async isFriends(userId1, userId2) {
        return userFuncs.isFriends(userId1, userId2);
    }


    async getUserPrimaryGroup(userId) {
        return userFuncs.getUserPrimaryGroup(userId);
    }





    async getUserBadges(userId) {
        return userFuncs.getUserRobloxBadges(userId);
    }

    // ASSETS \\
    /**
     * Returns information about the product id (or asset)
     * @param {assetId} assetId The id of the asset
     * @returns Promise <Class Asset>
     * @see https://roblox.ink/classes#asset
     */
    async getProductInfo (assetId) {
        return new assetClass.Asset(await assetFuncs.getProductInfo(assetId));
    }


    /**
     * Gets information about a game pass
     * @param {passId} passId This does not currently work due to Roblox  ¯\\__(ツ)_/¯
     * @deprecated This is deprecated, do not use it for new work (does not work)
     */
    async getPassInfo (passId) {
        return new assetClass.Pass(await assetFuncs.getPassInfo(passId));
    }


    /**
     * Gets a user's places
     * @param {Number} userId The user id
     */
    async getUserPlaces(userId) {
        return userFuncs.getUserPlaces(userId);
    }

    /**
     * Gets comments on an asset
     * @param {Number} assetId The asset id
     */
    async getAssetComments (assetId) {
        return assetFuncs.getAssetComments(assetId);
    }


    /**
     * Search for music
     * @param {String} name The name to search for
     */
    async searchMusic(name) {
        return assetFuncs.searchMusic(name);
    }
    

    

    // AVATAR \\


    /**
     * Returns the avatar info about the user's avatar
     * @param {userId} userId The user's id
     * @returns Promise <Class Avatar>
     * @see https://roblox.ink/classes#avatar 
     */
    async getAvatar (userId) {
        if (!userId && !this.authenticated) throw new Error("No user id given, and not authenticated");
        return new avatarClass.Avatar(await avatarFuncs.getAvatar(userId || this.account.userId));
    }

    /**
     * Returns an array of items the user is currently wearing
     * @param {userId} userId The user's id (optional, uses the authenticated user if no id is given)
     * @returns Promise <Array [Class AssetId]>
     * @see https://roblox.ink/classes#assetid
     */
    async getCurrentlyWearing (userId) {
        if (!userId && !this.authenticated) throw new Error("No user id given, and not authenticated");
        return [].concat(await avatarFuncs.getCurrentlyWearing(userId || this.account.userId)).map(x=>new avatarClass.AssetId(x));
    }

    /**
     * Returns an array of the user's outfits (current page)
     * @param {userId} userId The user id
     * @param {Optional} o The settings for the search
     * @see https://roblox.ink/classes#outfititem
     * @example rbx.getOutfits(1, {page:1}).then(items=>{
     *  console.log(items.length);
     * })
     * @returns Promise <Array [Class OutfitItem]>
     * 
     */
    async getOutfits (userId, o) {
        if (!userId && !this.authenticated) throw new Error("No user id given, and not authenticated");
        return [].concat(await avatarFuncs.getOutfits(userId || this.account.userId, o || {})).map(x=>new avatarClass.OutfitItem(x));
    }




    // GROUP \\


    /**
     * Returns a class Group (required to do this in order to set ranks!)
     * @param {groupId} groupId The id of the group
     * @returns Promise <Class Group>
     */
    async getGroup(groupId) {
        return new groupClass.Group(await groupFuncs.getGroup(groupId));
    }



    // POST REQUEST \\


    /**
     * 
     * @param {url} url url address to send a post request to (careful to not do post requests to other sites than Roblox)
     * @param {settings} opts Optional settings to provide 
     * @example
     * // Function to sign out of the authenticated account
     *  rbx.postRequest('https://api.roblox.com/sign-out/v1').then(()=>{
     *      console.log("Signed out")
     * })
     */
    async postRequest(url, opts) {
        return post_req(url, opts||{})
    }

    async logout() {
        if (!this.authenticated) throw new Error("Not authenticated");
        global.xcsrf = null;
        global.cookies = null;
        this.authenticated = false;
        return post_req('https://api.roblox.com/sign-out/v1')
    }
    
    
    
}




module.exports = RobloxApi;


/*
async function HandleLogin(res) {
    res = res.response;
    if (res && res.headers) {
        var cookies = res.headers['set-cookie']; // If the user is already logged in a new cookie will not be returned.
        //console.log(cookies);
        if (cookies) {
          var session = cookies.toString().match(/\.ROBLOSECURITY=(.*?);/)[1];
          var xcsrf = await getXcsrf()

          process.env.Cookie = session;
          process.env.XCSRF = xcsrf;
          return true
        } else {
            throw new Error("Failed to get cookie")
        }
    } else return false;
}*/



/*
async function HandleLogin(res) {
    if (res && res.headers) {
        var cookies = res.headers['set-cookie']; // If the user is already logged in a new cookie will not be returned.
        //console.log(cookies);
        console.log(res.headers);
        if (cookies) {
          var session = cookies.toString().match(/\.ROBLOSECURITY=(.*?);/)[1];
          console.log(session)
          var xcsrf = await getXcsrf()

          process.env.Cookie = session;
          process.env.XCSRF = xcsrf;
          return true
        } else {
            throw new Error("Failed to get cookie")
        }
    } else return false;
}*/