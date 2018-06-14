const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../users/User');

function generateToken(user) {
  console.log("testing helper function")
  const options = {
    expiresIn: '1h',
  }
  //sign the token
  const secret = 'Secret is yours';
  const payload = { name: user.username, }
  return jwt.sign(payload, secret, options);
}

router.post('/register', function(req, res) {
  User.create(req.body)
    .then(({ username, race }) => {
      // we destructure the username and race to avoid returning the hashed password
      const token = generateToken({username})
      // then we assemble a new object and return it
      res.status(201).json({ username, race, token });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

module.exports = router;

