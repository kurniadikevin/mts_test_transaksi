const User= require('../model/m_user');
const bcrypt =require('bcryptjs');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


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


//SIGN UP buat user untuk berfungsi sebagai admin 
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
    User.findById({_id: id}, function(err, user) {
      done(err, user);
    });
  });

// sign in
exports.user_sign_in=(req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          /* const info= req.user;
          res.send({info,...res.locals.token}); */
          res.send(req.user)
        });
      }
    })(req, res, next);
  };