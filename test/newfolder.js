var login = require('../utils/login');
var should = require('chai').should();

describe('新建文件夹', function(){
    var client;
    this.timeout(999999999);

    before(function(done){
        client = login(done);
    });

    it('新建个人文件夹按钮可点击', function(done){
        client
        .waitForExist('#fileListView',8000)
        .click('#new_folder', function(){
            client
            .pause(5000)
            // .waitForExist('.egeui-dialog',5000)
            .getText('.egeui-dialog-title', function(err,text){
                // console.log(text);
                text.should.equal('新建文件夹');

                done();
            });
        });
    });

    it('新建个人文件夹', function(done){
        var folderName = Math.round(Math.random()*1000000);
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
        .click('[data-title="更多选项"]')
        .pause(1000)
        .click('#container-main .delete')
        .pause(1000)
        .click('[data-role="confirm"]', function(){
            client
            .pause(1000)
            .getText('.file-name', function(err,text){
                text[0].should.not.equal(folderName.toString());

                done();
            });
        });
    });

    after(function(done){
        client.end(done);
        client = null;
    });
});


