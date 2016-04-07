var login = require('../../utils/login');
var should = require('chai').should();
var folderName = Math.round(Math.random()*1000000);

describe('审阅操作', function(){
    var client;
    this.timeout(999999999);

    before(function(done){
        client = login(done);
    });

    it('新建一个word文档', function(done){
        client
        .pause(2000)
        .click('#create_new')
        .waitForExist('[data-type="1"]',8000)
        .click('[data-type="1"]')
        .setValue('#new_item_name', folderName)
        .click('.submit', function(){
            client
            .pause(1000)
            .getText('.file-name', function(err,text){
                text[0].should.equal(folderName.toString()+'.doc');

                done();
            });
        });
    });

    it('发起审阅', function(done) {
        client
        .pause(2000)
        .rightClick('#fileList li:firstchild thumb-icon')
        .click('.review')
        .waitForExist('[data-type="title"]',8000)
        .setValue('#title', '审阅测试标题')
        .click('.form-control-group > input')
        .setValue('input', 'lo')
        .keys('Enter')
        .pause(2000)
        .click('.dialog-action .send', function(err,text){
            client
            .pause(1000);

            done();
        });
    });


    after(function(done){
        client.end(done);
        client = null;
    });
});
