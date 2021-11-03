// APPLICATION
const express = require('express');         // creation server node.js
const bodyParser = require('body-parser');  // form to json
const mongoose = require ('mongoose');    // connexion & gestion mongoDB
const path = require('path');             // static path
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
require('dotenv').config();   // secured credentials to mongoDB

// Connexion a la DB
mongoose.connect(`mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@${process.env.DB_address}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(()=> console.log('MongoDB NOT connected...'));


const app = express();

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));   // rep 'images' static enregistré
app.use('/api/stuff', stuffRoutes);   // appel de /routes/stuff.js pour DB
app.use('/api/auth', userRoutes);     // appel de /routes/user.js pour AUTH

module.exports = app;