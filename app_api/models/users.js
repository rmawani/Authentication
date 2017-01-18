var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

function toLower (str) {
    return str.toLowerCase();
}

var userSchema = new mongoose.Schema({
  UserID: {
    type: Number,
    unique: true,
    index: { unique: true },
    auto: true,
    required: true
  },
  EmailAddress: {
    type: String,
    set: toLower,
    unique: true,
    required: true
  },
  CellPhoneNumber: {
    type: String,
    unique: true,
    required: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  CompanyName: {
    type: String,
    required: true
  },
  EmployeeID: {
    type: String,
    required: true
  },
  City: {
    type: String,
    required: true
  },
  Province: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto
    .randomBytes(16)
    .toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64)
    .toString('hex');
};

userSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64)
    .toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    UserID: this.UserID,
    FirstName: this.FirstName,
    LastName: this.LastName,
    EmailAdress: this.EmailAdress,
    CellPhoneNumber: this.CellPhoneNumber,
    CompanyName: this.name,
    EmployeeID: this.EmployeeID,
    City: this.City,
    Province: this.Province,
    exp: parseInt(expiry.getTime() / 1000)
  }, "hHztDiLKCz1i0eveemndIuLqS_gx9ML0"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);
