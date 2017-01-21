var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

//require('./env');

var auth = jwt({
  secret: 'hHztDiLKCz1i0eveemndIuLqS_gx9ML0',
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
