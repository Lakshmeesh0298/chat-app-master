const { connect } = require('mongoose')
const { NODE_ENV, MONGODB_CLOUD_URL, MONGODB_LOCAL_URL } = require('./index')

module.exports = function dbConnect() {
    try {
        if (NODE_ENV === "development") {
            connect(MONGODB_LOCAL_URL, () => console.log('Local DB connected'))
        } else {
            connect(MONGODB_CLOUD_URL, () => console.log('Local DB connected'))
        }
    } catch (error) {
        console.log(error)
    }
}