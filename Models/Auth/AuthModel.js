const { Schema, model } = require('mongoose')
const CryptoJS = require('crypto-js')
const { PASS_SEC } = require('../../config/index')
const { hashingPassword } = require('../../helpers/Password')

const AuthSchema = new Schema({
    username: { type: String, required: true, },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
    password: { type: String },
    batchCode: { type: Array },
    role: { type: String, enum: ['trainer', 'admin', 'hr', 'councellor', 'feetracker'], default: 'trainer' },
    idNum: { type: String, unique: true }
})

AuthSchema.pre('save', async function pass() {
    let password = this.email.slice(0, 4) + this.number.toString().slice(6, 10)
    this.password = await hashingPassword(password)
    // await CryptoJS.AES.encrypt(password, PASS_SEC).toString()
})

AuthSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password)
}

module.exports = model('auths', AuthSchema)