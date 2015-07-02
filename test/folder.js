var login = require('../utils/login');
var should = require('chai').should();
var folderName = Math.round(Math.random()*1000000);

describe('文件夹操作', function(){
    var client;
    this.timeout(999999999);

    before(function(done){
        client = login(done);
    });

    it('新建个人文件夹按钮可点击', function(done){
        client
        .waitForExist('#fileListView',8000)
        .waitForExist('#new_folder',8000)
        .click('#new_folder', function(){
            client
            .pause(2000)
            // .waitForExist('.egeui-dialog',5000)
            .getText('.egeui-dialog-title', function(err,text){
                console.log(text);
                text.should.equal('新建文件夹');

                done();
            });
        });
    });

    it('新建个人文件夹', function(done){
        // var folderName = Math.round(Math.random()*1000000);
        client
        .setValue('#new_item_name', folderName)
        .click('[data-radio-value="create_folder"]')
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
        .pause(5000)
        // .waitForExist('.file-name',5000)
        .click('#fileList .list:first-child .icon-context')
        .pause(1000)
        .click('#context_menu .delete')
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
        // var folderName = Math.round(Math.random()*1000000);
        client
        .pause(8000)
        .click('#new_folder')
        .setValue('#new_item_name', folderName+'协作')
        .click('.egeui-dialog-content .dialog-action .submit')
        .pause(1000)
        .setValue('.add-new-collab .collab-select .contact-selector input', '张艳')
        // .click('.egeui-select .item-list:first-child .egeui-select-item', function(){
        //     console.log('there');
        // })
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
        client.end(done);
        client = null;
    });
});


