require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    MONGODB_CLOUD_URL: process.env.MONGODB_CLOUD_URL,
    MONGODB_LOCAL_URL: process.env.MONGODB_LOCAL_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    PASS_SEC: process.env.PASS_SEC,
    JWT_EXPIRE: process.env.JWT_EXPIRE
}