var webdriverio = require('webdriverio');     //配置文件引用
var config = require('../config.js');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

module.exports = function login(_config, _options, done) {
    // 向前兼容老的调用方式
    if (typeof _config === 'function') {
      done = _config;
    }

    var username = _config.username || config.username;
    var password = _config.password || config.password;
    var host = _config.host || 'www.fangcloud.com';

    _options = _options || options;

    return webdriverio
    .remote(_options)
    .init()
    .url('http://' + host + '/auth/login')
    .setValue('#email', username)
    .setValue('#password', password)
    .submitForm('.form', function(){
        if(typeof done === 'function') {
            done();
        }
    });
};
