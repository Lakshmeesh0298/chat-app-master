const { unHashingPassword } = require("../../helpers/Password")
const AuthModel = require("../../Models/Auth/AuthModel")
const StudentModel = require("../../Models/Auth/StudentModel")
const BatchModel = require("../../Models/batch/BatchModel")

// LOGIN
const studentLogin = async (req, res) => {
    try {
        let user = await StudentModel.findOne({ email: req.body.email }).lean()
        let hashedPassword = unHashingPassword(user.password)
        console.log(hashedPassword)
        let batches = await BatchModel.find({ _id: { $in: user.batchCode } })
        res.status(200).json({ ...user, batches })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// RESET PASSWORD
const resetPassword = async (req, res) => {
    console.log(req.body)
    try {
        let updatedUser = await StudentModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(201).json(updatedUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { studentLogin, resetPassword }