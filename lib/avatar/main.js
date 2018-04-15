var getAvatar = require('./funcs/getAvatar.js')
var getCurrentlyWearing = require('./funcs/getCurrentlyWearing.js');
var getOutfits = require('./funcs/getOutfits.js');


exports.getAvatar = async function(...args) {
    return getAvatar(...args);
}


exports.getCurrentlyWearing = async function(...args) {
    return getCurrentlyWearing(...args);
}

exports.getOutfits = async function(...args) {
    return getOutfits(...args);
}