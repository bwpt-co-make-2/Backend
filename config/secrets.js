require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWET_SECRET || "I have 4 cats"
};