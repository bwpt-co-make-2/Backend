const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const issuesRouter = require('../issues/issues-router.js');
const upvoteRouter = require('../upvote/upvote-router.js')

//middleware
const authenticate = require('../auth/authenticate-middleware.js');

const authModel = require('../auth/auth-model.js');
const secrets = require('../config/secrets.js');

const server = express();

server.use(express.json());
server.use(helmet()); 

server.use('/issues', authenticate, issuesRouter);
server.use('/upvotes', authenticate, upvoteRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: "Thatcher's CoMake API is alive!" })
})

server.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;

    authModel.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error registering this user"})
        })
})

server.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    authModel.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user)
  
          const decoded = jwt.verify(token, secrets.jwtSecret)
          console.log(decoded)
  
          res.status(200).json({
            message: `Welcome ${user.username}`,
            token: token
          })
        } else {
          res.status(401).json({message: "Invalid credentials"})
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error logging in"})
      })
  });

  function generateToken(user) {
    const payload = {
      userid: user.id,
      username: user.username
    }
  
    const options = {
      expiresIn: '1h'
    }
  
    return jwt.sign(payload, secrets.jwtSecret, options)
  }
  

module.exports = server;