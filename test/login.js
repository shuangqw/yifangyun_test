var config = require('../config.js');         //用户名密码的配置文件

var webdriverio = require('webdriverio');
var should = require('chai').should();
var options = {
    desiredCapabilities: {                    //调用chrome浏览器
        browserName: 'chrome'
    }
};
describe('login', function(){
    var client;
    this.timeout(999999999);

    before(function(done){
        client = webdriverio.remote(options).init(done);
    });

    it('首页title存在', function(done){        //进入首页并通过title进行验证
        client
        .url('http://www.fangcloud.com')
        .title(function(err, res) {
            res.value.should.equal('亿方云 -移动办公平台.资料共享.文件备份.国内安全云端网盘.云存储同步网盘服务商');
            // console.log('Title was: ' + res.value);          //输出首页title
            // console.log(arguments);
            done();
        });
    });

    it('登录页存在', function(done){          //通过title验证进入登录页面
        client
        .waitForExist('.site-nav span+.login',5000)
        .click('.site-nav span+.login')
        .title(function(err, res){
            res.value.should.equal('登录 - 亿方云');

            done();
        });

    });

    it('登录失败', function(done){             //错误的用户名密码
        client
        .waitForExist('#full_page',1000)
        .setValue('#email',config.username)     //输入邮箱
        .setValue('#password',config.wrongpsd)                 //输入密码
        .submitForm('.form', function(err,res){
            client
            .waitForExist('.error-msg',1000)
            .getText('.error-msg',function(err,text){
                var errorMessage = ['请输入有效的邮箱','邮箱或密码错误','请输入邮箱'];
                errorMessage.indexOf(text).should.not.equal(-1);

                done();
            });
        });
    });

    it('登录成功', function(done){            //正确的用户名密码登录
        client
        .waitForExist('#full_page',1000)
        .setValue('#email',config.username)     //输入邮箱
        .setValue('#password',config.password)                 //输入密码
        .submitForm('.form', function(err,res){
            client
            .waitForExist('.error-msg',1000)
            .getText('.error-msg',function(err,text){
                var errorMessage = ['请输入有效的邮箱','邮箱或密码错误','请输入邮箱'];
                errorMessage.indexOf(text).should.equal(-1);

                done();
            });
        });
    });

    after(function(done){
        client.end(done);
        client = null;
    });
});
