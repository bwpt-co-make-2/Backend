const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet()); 

server.get('/', (req, res) => {
    res.status(200).json({message: "Thatcher's CoMake API is alive!" })
})

module.exports = server;