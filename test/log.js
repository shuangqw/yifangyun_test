var config = require('../config');

var cheerio = require('cheerio');
var webdriverio = require('webdriverio');
var should = require('chai').should();
var login = require('../utils/login');
var options = {
    desiredCapabilities: {                    //调用chrome浏览器
        browserName: 'chrome'
    }
};


describe('Log', function(done){
  var client;
  this.timeout(99999999);

  before(function(done){
    client = login(config.log, options)
            .pause(1000)
            .url('http://' + config.log.host + '/admin/log/index')
            .then(function(){
              done();
            });
  });

  after(function(done){
    client.end().then(done);
  });

  it('正常打开日志页面', function(done){
    client
    .waitForExist('#log h4', 3000)
    .getText('#log h4', function(err, text){
      text.should.equal('操作日志');

      done();
    });
  });

  it.skip('「操作时间」列格式为 yyyy-mm-dd hh:mm:ss', function(done){
    client.getText('.log-list-content .log-list .log-created', function(err, text) {
      text[0].should.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);

      done();
    });
  });

  it('「员工」列格式为 姓名<br>邮箱', function(done){
    client.getHTML('.log-list-content .log-list .log-operator', function(err, html) {
      html[0].should.match(/<a[^>]*>.+?<\/a><br\s?\/?>.*?\w+@\w+?\.\w+/);

      done();
    });
  });

  it('登录成功日志', function(done){
    // 因为账号本身模拟登陆，所以最新的日志应该是测试账号登陆成功
    client.getHTML('.log-list-content .log-list .list-row', function(err, html) {
      var $ = cheerio.load(html[0]);

      var operator = $('.log-operator a').first().text();
      operator.should.equal('测试');

      var action = $('.log-action a').text();
      action.should.equal('登录成功');

      done();
    });
  });

  it('登录失败日志', function(done){
    // 使用错误的密码登录亿方云，期望看到错误日志
    var testClient = login({
      username: config.log.testUsername,
      password: '123',
      host: config.log.host
    }, options);

    testClient.then(function(){
      client
        .refresh()
        .pause(1000)
        .getHTML('.log-list-content .log-list .list-row', function(err, html) {
          var $ = cheerio.load(html[0]);

          var operator = $('.log-operator a').first().text();
          operator.should.equal('aa');

          var action = $('.log-action a').text();
          action.should.equal('登录失败');

          testClient.end();
          done();
        });
    });
  });


  it('登出日志', function(done){
    // 测试账号登入
    var testClient = login({
      username: config.log.testUsername,
      password: config.log.testPassword,
      host: config.log.host
    }, options).pause(1000);

    // 测试账号登出
    testClient.url('http://' + config.log.host + '/auth/logout')
    .pause(1000)
    .then(function(){
      client
        .refresh()
        .pause(1000)
        .getHTML('.log-list-content .log-list .list-row', function(err, html) {
          var $ = cheerio.load(html[0]);

          var operator = $('.log-operator a').first().text();
          operator.should.equal('aa');

          var action = $('.log-action a').text();
          action.should.equal('登出');

          testClient.end();
          done();
        });
    });
  });

});
