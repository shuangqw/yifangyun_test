var webdriverio = require('webdriverio');
var config = require('../config.js');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

module.exports = function login(done) {
   return webdriverio
    .remote(options)
    .init()
    .url('http://www.fangcloud.com/auth/login')
    .setValue('#email',config.username)
    .setValue('#password',config.password)
    .submitForm('.form', function(){
      done();
    });
};
