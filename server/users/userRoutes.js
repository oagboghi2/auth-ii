const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('./User');

function generateToken(user){
  const options = {
    expiresIn: '1h',
  }
  //sign the token
const secret = 'Secret is yours';
const payload = { name: user.username, }
return jwt.sign(payload, secret, options)
}

router.get('/api', (req, res) => {
  User.find()
    .select('-password')
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router
  .post('/api/signup', (req, res) => {
    User.create(req.body)
      .then(user => {
        const token = generateToken(user)

        res.status(201).json({ username: user.username, token })
      })
      .catch(err => {
        res.status(500).json(err)
      })
  })

router
  .post('/api/signin', (req, res)=>{
    const { username, password } = req.body;

    User.findOne({ username, password})
    .then(user => {
      if(user){
        user
          .validatePassword(password)
          .then(passwordsMatch => {
            if(passwordsMatch){
              //generate the token
              const token = generateToken(user);
              //send token back to the client
              res.status(200).json({ message: `welcome ${username}!`, token });
            } else {
              res.status(401).json({ errorMessage: 'invalid credentials'});
            }
          })
          .catch(err => {
            res.send('error comparing passwords');
          }); 
      } else {
        res.status(401).send('invalid credentials')
      } 
    })
    .catch(err => {
      res.send(err);
    });
  });

router
  .post('/api/signup', (req, res)=>{
    User.create(req.body)
      .then(user => {
        const token = generateToken(user);

        res.status(201).json({ username: user.username, token });
      })
      .catch(er => res.status(500).json(err));
  })

module.exports = router;
