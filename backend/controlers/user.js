// CONTROLER d'Authentification - logique metier
const User = require('../models/user');
const bcrypt = require('bcrypt');     // package de cryptage (password)
const jwt = require('jsonwebtoken');  // encrypted token

exports.signUp = (req,res,next) => {
  bcrypt.hash(req.body.password, 10)    // method HASH(string, roundsToHash)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({message: 'User registered!'}))  // 201 obj added
        .catch(err => res.status(400).json({ err }));
    })
    .catch(err => res.status(500).json({ err }));
};

exports.login = (req,res,next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({error: 'User not found.'});    // 401 non autorisé
      }
      bcrypt.compare(req.body.password, user.password)    // renvoie boolean
        .then(valid => {
          if (!valid) {
            return res.status(401).json({error: 'Incorrect password.'});
          }
          res.status(200).json({        // 200 req ok
            userId: user._id,
            token: jwt.sign({userId: user._id}, 'RANDOM_TOKEN', {expiresIn: '24h'})
          })
        })
        .catch(err => res.status(500).json({err}));
    })
    .catch(err => res.status(500).json({err}));   // 500 erreur serveur/connexion
}