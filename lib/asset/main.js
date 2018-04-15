var getProductInfo = require('./funcs/getProductInfo.js')
var getPassInfo = require('./funcs/getPassInfo.js');



exports.getProductInfo = async function(...args) {
    return getProductInfo(...args);
}

/*
exports.getPassInfo = async function(...args) {
    return getPassInfo(...args);
}*/