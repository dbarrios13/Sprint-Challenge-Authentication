const axios = require('axios');
const bcrypt = require('bcryptjs')
const { authenticate } = require('../auth/authenticate');
const Users = require('./users-model')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let user = req.body

  const hash = bcrypt.hashSync(user.password, 14)

  user.password = hash

  Users.add(user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        
        res.status(200).json({
          message: `Welcome ${user.username}, have a token`
        })
      } else {
        res.status(401).json({
          message: 'Invalid Credentials'
        })
      }
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
