var login = require('../utils/login');
var should = require('chai').should();
var newfolder = require('../utils/newfolder');
var folderName = Math.round(Math.random()*1000000);
var shareLink = '';


describe('分享', function(){
    var client;
    this.timeout(999999999);

    before(function(done){
        client = login(done);
    });

    it('分享文件夹按钮可点击', function(done){
        newfolder(client,folderName,done);

        client
        .pause(5000)
        .click('#fileList .list:first-child .icon-context')
        .pause(1000)
        .click('#context_menu .share')
        .waitForExist('.egeui-dialog-content',5000)
        .getText('.egeui-dialog-content .egeui-dialog-title', function(err,text){
            text.should.equal('分享文件夹：'+folderName);

            done();
        });
    });

    it('文件夹可分享', function(done){
        client
        .click('.submit', function(){
            console.log('aaa');
        })
        .pause(1000)
        .waitForExist('#share_link',5000)
        .getValue('#share_link', function(err,value){
            value.should.not.equal('');

            shareLink = value;

            done();
        });
    });

    after(function(done){
        client.end(done);
        client = null;
    });
});


