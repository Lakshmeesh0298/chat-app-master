const CryptoJS = require('crypto-js')
const { PASS_SEC } = require('../config')

exports.hashingPassword = (password) => {
    return CryptoJS.AES.encrypt(password, PASS_SEC).toString()
}

exports.unHashingPassword = (password) => {
    return CryptoJS.AES.decrypt(password, PASS_SEC).toString(CryptoJS.enc.Utf8)
}
