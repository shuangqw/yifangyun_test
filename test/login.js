var config = require('../config.js');

var webdriverio = require('webdriverio');
var should = require('chai').should();
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};
describe('login', function(){
    var client;
    this.timeout(999999999);

    before(function(done){
        client = webdriverio.remote(options).init(done);
    });

    it('首页title存在', function(done){
        client
        .url('http://www.fangcloud.com')
        .title(function(err, res) {
            res.value.should.equal('亿方云 -移动办公平台.资料共享.文件备份.国内安全云端网盘.云存储同步网盘服务商');
            console.log('Title was: ' + res.value);          //输出首页title
            // console.log(arguments);
            done();
        });
    });

    it('登录页存在', function(done){
        client
        .click('=登录')
        .title(function(err, res){
            res.value.should.equal('登录 - 亿方云');
            done();
        });

    });

    it('登录成功', function(done){
        client
        .waitForExist('#full_page',5000)
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
// webdriverio
//     .click('=登录')                                      //进入登录页
//
//     // .waitForExist('li.list', 5000)                      //等待文件列表页加载成功
//     // .title(function(err,res){
//     //     // console.log(res.value);
//     //     var mes = '全部文件 - 亿方云';
//     //     if(mes == res.value){
//     //         console.log('login success');               //根据title判断是否登录成功，成功后title会变成“全部文件 - 亿方云”
    //     }else{
    //         console.log('login failed!');
    //     }
    // });
    // .url('https://www.fangcloud.com/apps/files/home', function(err,res){
    //     console.log(res);
    // });
