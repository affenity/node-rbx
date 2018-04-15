const userFuncs = require('./lib/user/main.js')
const userClass = require('./lib/user/class.js')

const assetFuncs = require('./lib/asset/main.js')
const assetClass = require('./lib/asset/class.js')

const avatarFuncs = require('./lib/avatar/main.js')
const avatarClass = require('./lib/avatar/class.js')

const groupFuncs = require('./lib/group/main.js')
const groupClass = require('./lib/group/class.js')

const fetch = require('node-fetch');
const request = require('request')
const parser = require('cheerio')
const fs = require('fs');
var rp = require('request-promise');

const robloxFetch = require('./lib/util/fetch.js');


const get_xcsrf = require('./lib/util/xcsrf.js')




class RobloxApi {

    constructor(settings) {
        this.settings = settings;
        this.account = null;
        this.authenticated = false;
        var jar = request.jar()
        global.jar = jar;
    }   






    async login(s) {
        if (this.authenticated==true) return false;
        s = s || this.settings
        var waitLogin = new Promise(async function(resolve, reject) {
            
            var url = 'https://www.roblox.com/newlogin';
            var post = {
              username: s.username,
              password: s.password
            };

            

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
                          throw new Error("Couldn't find cookies")
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
                      throw new Error('Login failed, unknown redirect: ' + res.headers.location);
                    }
                    throw new Error('Login failed, known issues: ' + JSON.stringify(errors));
                  }
                
              })


        })

        await waitLogin;
        var isAuthenticated = await this.authenticate();
        return true 
        // Return waitLogin
    }

   /**
    * Logs into a Roblox account (recommended)
    * @param {Object} a An object with either username and password, or cookie
    */
   async access(a) {
       
    }



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
    
    async GetUserById (id) {
        return new userClass.User(await userFuncs.getUserProfile(id));
    }

    async GetUserByName (name) {
        return new userClass.User(await userFuncs.getUserProfile( await userFuncs.getIdFromUsername(name)));
    }


    async getRobux() {
        return Number( await userFuncs.getCurrency());
    }


    async acceptFriendRequest(targetId) {
        if (!this.authenticated) throw new Error("Not authenticated")
        return userFuncs.acceptFriendRequest(this.account.userId, targetId);
    }


    async declineFriendRequest(targetId){
        if (!this.authenticated) throw new Error("Not authenticated");
        return userFuncs.declineFriendRequest(this.account.userId, targetId);
    }

    async canManageAsset (userId, assetId) {
        return Boolean(await userFuncs.canManageAsset(userId, assetId))
    }


    async ownsAsset (userId, assetId) {
        return Boolean(await userFuncs.userOwnsAsset(userId, assetId));
    }
    

    async BlockUser (userId) {
        if (!this.authenticated) throw new Error("Not authenticated");
        return userFuncs.blockUser(userId)
    }

    async UnblockUser(userId) {
        if (!this.authenticated) throw new Error("Not authenticated");
        return userFuncs.unblockUser(userId);
    }






    // ASSETS \\
    async getProductInfo (assetId) {
        return new assetClass.Asset(await assetFuncs.getProductInfo(assetId));
    }

    async getPassInfo (passId) {
        return new assetClass.Pass(await assetFuncs.getPassInfo(passId));
    }


    // AVATAR \\

    async getAvatar (userId) {
        if (!userId && !this.authenticated) throw new Error("No user id given, and not authenticated");
        return new avatarClass.Avatar(await avatarFuncs.getAvatar(userId || this.account.userId));
    }


    async getCurrentlyWearing (userId) {
        if (!userId && !this.authenticated) throw new Error("No user id given, and not authenticated");
        return [].concat(await avatarFuncs.getCurrentlyWearing(userId || this.account.userId)).map(x=>new avatarClass.AssetId(x));
    }


    async getOutfits (userId, o) {
        if (!userId && !this.authenticated) throw new Error("No user id given, and not authenticated");
        return [].concat(await avatarFuncs.getOutfits(userId || this.account.userId, o || {})).map(x=>new avatarClass.OutfitItem(x));
    }


    // GROUP \\


    async getGroup(groupId) {
        return new groupClass.Group(await groupFuncs.getGroup(groupId));
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