const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = 'Secret is yours';


const User = require('./User');

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

function restricted(res,req,next) {
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Does not pass verification" })
      }
    next();
    });
  } else {
    res.status(401).json({ message: "Does not pass token"})
  }
}

router
  .get('/list', (req, res) => {
    User.find()
      .select('-password -race')
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

router
  .post('/signin', (req, res)=>{
    const { username, password } = req.body;
    console.log("req.body : ", req.body);
    console.log(typeof password);
    User.findOne({ username })
    .then(user => {
      console.log("user : ", user)

      if(user){
        user
          .validatePassword(password)
          .then(Match => {
            //console.log("Match : ", Match)
            if(Match){
              const token = generateToken(user);
              //send token back to the client
              console.log("Match : ", Match)
              res.status(200).json({ message: `${username}!`, token });
            } else {
              console.log(Match)
              res.status(401).json({ errorMessage: 'Passwords fail to match.invalid credentials'});
            }
          })
          .catch(err => {
            console.log(err);
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



module.exports = router;
