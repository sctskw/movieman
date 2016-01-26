// Load the bcrypt module
var _ = require('lodash');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');
var loki = require('lokijs');
var db = new loki(__basedir + 'db.json');
var moviedb;
try{
    moviedb = db.getCollection('movies');
  }catch (err){
    moviedb = db.addCollection('movies');
}

//checks for the must haves on the request
function validate(req, res, next){
  if (!req.body.username){
    err = new Error('username not supplied');
    err.status = 400;
    return next(err);
  }

  if(!req.body.password){
    err = new Error('password not supplied');
    err.status = 400;
    return next(err);
  }

  return next();
}

//filters out any unwanted properites
function filter(req, res, next){
  approved = [
    'username',
    'password',
  ];

  req.body = _.pick(req.body, approved);
  return next();
}

//creates user if username doesn't exist in db
//req.passwordFound === true if user successfully sent a password
function createUser(req, res, next){
  var hash;
  if (!req.createUser){
    return next();
  }

  hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  var user = moviedb.insert({user:req.body.username, password: hash});
  req.user = user;
  return next();
  // creates the user
}

//checkIf suppliedPassword matches whats in the db
//If username is not taken req.createPassword = true
function checkPassword(req, res, next){
  var validLogin;
  var user;
  getByUsername(req.body.username)
  .then(function(users){
    if (!users.length){
      req.createUser = true;
      return next();
    }
    user = users[0];
    validLogin = bcrypt.compareSync(req.body.password, user.password);
    if (!validLogin){
      err = new Error('invalid password try again');
      err.status = 400;
      return next(err);
    }
    req.user = user;
    return next();
  }).catch(next);
}

//Builds the body of the response message so the default handler can be used
function buildResponse(req, res, next){
  res.body = req.user;
  return next();
}

//Grabs from the movie collection for a new username
function getByUsername(username) {
  return new Promise(function(resolve, reject) {
    try{
      return resolve(moviedb.find({user: username}));
    } catch(err) {
      return reject(err);
    }
  });
}

//Execution Flow
//Checks if username and password is valid
//If username is not taken creates a new user with the suppliedPassword'
exports.login = [
  filter,
  validate,
  checkPassword,
  createUser,
  buildResponse
];
