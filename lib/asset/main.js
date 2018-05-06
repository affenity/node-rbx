var getProductInfo = require('./funcs/getProductInfo.js')
var getPassInfo = require('./funcs/getPassInfo.js');
var getAssetComments = require('./funcs/getAssetComments.js');
var searchMusic = require('./funcs/searchMusic.js');


exports.getProductInfo = async function(...args) {
    return getProductInfo(...args);
}

exports.getAssetComments = async function (...args) {
    return getAssetComments(...args);
}

exports.searchMusic = async function(...args) {
    return searchMusic(...args);
}


/*
exports.getPassInfo = async function(...args) {
    return getPassInfo(...args);
}*/