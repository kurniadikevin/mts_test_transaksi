const User= require('../model/m_user');
const bcrypt =require('bcryptjs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();



// GET all user list
exports.get_user_list = (req, res,next) => {
    User.find({},{password : 0})
    .then((data)=>{
     res.send(data);
    })
    .catch((err)=>{
     return next(err)
    })
  };


//SIGN UP membuat user yang berfungsi sebagai admin 
exports.create_new_user=(async (req,res,next)=>{
    const usernameExist = await User.find({ username : {$eq :req.body.username}});
        if(usernameExist.length > 0){
          return res.status(400).json({ error: 'Username already used' });
        } else{
             bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          // if err, do something
          if(err){
            return next('password failed to proceed');
          }
        const user = new User({
          username : req.body.username,
          password: hashedPassword,
        })
        user.save().then((data)=>{
            res.send({
                message: 'User berhasil ditambahkan',
                data : data,
                status : "Succeed"
            })
        }).catch((err)=>{
            return next(err)
        });
        })
        }
      })



//passport local strategy method
passport.use(
    new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password'
    },
      (username, password, done) => {
      User.findOne({ username: username }).then(( user) => {
        /* if (err) throw err; */
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user)
          }
           else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" })
          }
        })
      }
      ).catch((err)=>{
        return next(err)
    }
      )
    })
  );
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById({_id: id}).then( (err, user)=> {
      done(err, user);
    })
    .catch((err)=>{
      next(err)
    })
  });

// sign in
exports.user_sign_in=(req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          let {password, ...foundUser} = (req.user).toJSON();
          res.send({
            status : 'Succeed',
            message : 'User login berhasil',
            data : foundUser,
            token : res.locals.token
          })
        });
      }
    })(req, res, next);
  };

// middleware for generating bearer token
exports.generateTokenMiddleware=(req,res,next)=>{
  const user ={
    username : req.body.username,
    password : req.body.password
  }
  jwt.sign({user},process.env.JWT_BEARER_SECRETKEY ,(err,token)=>{
  res.locals.token= token// store token on res.locals
  })
  next()
}

//Verify Token
exports.verifyToken =(req,res,next)=>{
  //Auth header value = > send token into header
  const bearerHeader = req.headers.authorization;
  //check if bearer is undefined
  if(typeof bearerHeader !== 'undefined'){
      //split the space at the bearer
      const bearer = bearerHeader.split(' ');
      //Get token from string
      const bearerToken = bearer[1];
      //set the token
      req.token = bearerToken;
      
      //next middleweare
      jwt.verify(req.token,process.env.JWT_BEARER_SECRETKEY,(err)=>{
          if(err)
              res.sendStatus(403);
          else{
             next()
          }
      })

  }else{
      //Fobidden
      res.sendStatus(403);
  }
}