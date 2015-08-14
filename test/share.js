var login = require('../utils/login');
var should = require('chai').should();
var newfolder = require('../utils/newfolder');
var folderName = Math.round(Math.random()*1000000);
var shareLink = '';
var webdriverio = require('webdriverio');
var should = require('chai').should();
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};


describe('分享', function(){
    var client;
    this.timeout(999999999);

    beforeEach(function(done){
        client = webdriverio.remote(options).init(done);
    });

    it('分享文件夹', function(done){
        login(done);
        newfolder(client,folderName,done);

        client
        .pause(5000)
        .click('#fileList .list:first-child .icon-context')
        .pause(1000)
        .click('#context_menu .share')
        .waitForExist('.egeui-dialog-content',5000)
        .getText('.egeui-dialog-content .egeui-dialog-title', function(err,text){
            console.log('分享文件夹：'+folderName);
        })
        .click('.submit')
        .pause(1000)
        .waitForExist('#share_link',5000)
        .getValue('#share_link', function(err,value){
            value.should.not.equal('');

            shareLink = value;
            console.log(shareLink);

            done();
        });
    });

    it('分享链接可见',function(done){
        client = webdriverio.remote(options).init(done);

        client
        .url(shareLink)
        .title(function(err,res){
            console.log(res.value);
        });
    });

    afterEach(function(done){
        client.end(done);
        client = null;
    });
});


