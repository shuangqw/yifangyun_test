var login = require('../utils/login');
var should = require('chai').should();
var config = require('../config');
var folderName = Math.round(Math.random()*1000000);
var options = {
    desiredCapabilities: {                    //调用chrome浏览器
        browserName: 'chrome'
    }
};


describe('文件夹操作', function(){
    var client;
    this.timeout(10000);

    before(function(done){
        client = login(config.log,options,done);
    });

    it('新建个人文件夹', function(done){
        console.log('here');
        client
        .pause(8000)
        // .waitForExist('#fileListView',8000)
        .click('#create_new')
        .waitForExist('[data-type="0"]',8000)
        .click('[data-type="0"]')
        .setValue('#new_item_name', folderName)
        .click('.submit', function(){
            client
            .pause(1000)
            .getText('.file-name', function(err,text){
                text[0].should.equal(folderName.toString());

                done();
            });
        });
    });


    it('删除个人文件夹', function(done){
        client
        .waitForExist('#fileList',5000)
        .click('#fileList .list:first-child .item-clickable')
        .pause(1000)
        .click('.file-action .delete')
        .pause(1000)
        .click('[data-role="confirm"]', function(){
            client
            .pause(1000)
            .getText('#fileList .list:first-child .file-name', function(err,text){
                text[0].should.not.equal(folderName.toString());

                done();
            });
        });
    });

    it('新建协作文件夹', function(done){
        client
        .pause(8000)
        .click('#create_new')
        .waitForExist('[data-type="4"]')
        .click('[data-type="4"]')
        .pause(1000)
        .setValue('.input-primary', folderName+'协作')
        .click('.egeui-dialog-content .dialog-action .submit')
        .pause(1000)
        .setValue('.add-new-collab .collab-select .contact-selector input', '张艳')
        .pause(1000)
        .keys('Enter')
        .click('.dialog-action .send', function(){
            client
            .pause(1000)
            .getText('.file-name', function(err,text){
                text[0].should.equal(folderName.toString()+'协作');

                done();
            });
        });
    });


    after(function(done){
        console.log('end');
        client.end(done);
        client = null;
    });
});


