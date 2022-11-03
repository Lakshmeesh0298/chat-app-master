const { model, Schema } = require("mongoose");
const bcryptjs = require('bcryptjs');
const { hashingPassword } = require("../../helpers/Password");

const StudentSchema = new Schema(
    {
        username: { type: String, required: true, },
        email: { type: String, required: true, unique: true },
        number: { type: String, required: true, unique: true },
        password: { type: String },
        batchCode: { type: Array },
        idNum: { type: String, unique: true }
    },
    { timestamps: true }
);

StudentSchema.pre('save', async function pass() {
    let password = this.email.slice(0, 4) + this.number.toString().slice(6, 10)
    this.password = await hashingPassword(password)
    // await CryptoJS.AES.encrypt(password, PASS_SEC).toString()
})


module.exports = model("students", StudentSchema);
