var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

//require('./env');

var auth = jwt({
  secret: process.env.MLAB_SECRET, // DO NOT KEEP YOUR SECRET IN THE CODE!
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
