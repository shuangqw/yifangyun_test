var login = require('../../utils/login');
var should = require('chai').should();
var cheerio = require('cheerio');
var fileName = Math.round(Math.random()*1000000);

describe('审阅操作', function(){
    var client;
    this.timeout(999999999);

    before(function(done){
        client = login(done);
    });

    it('新建一个word文档', function(done){
        client
        .waitForExist('#fileList',5000)
        .click('#create_new')
        .waitForExist('[data-type="1"]', 5000)
        .click('[data-type="1"]')
        .setValue('#new_item_name', fileName)
        .click('.submit', function(){
            client
            .pause(1000)
            .getText('.file-name', function(err,text){
                text[0].should.equal(fileName.toString()+'.doc');

                done();
            });
        });
    });

    it('发起审阅', function(done) {         //通过右侧下三角处的右侧菜单进行审阅操作
        client
        .pause(2000, function(){
            console.log('ssssssaaaa');
        })
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .waitForExist('#context_menu .review', 2000)
        .click('#context_menu .review', function(){
            console.log('sss');
        })
        .waitForExist('.egeui-dialog .review-dialog',8000)
        .setValue('.egeui-dialog .review-dialog #commonform #title', '审阅测试标题')
        .click('.egeui-dialog .review-dialog .form-control-group .contact-selector >input')
        .setValue('.egeui-dialog .review-dialog .form-control-group .contact-selector >input', 'com')
        .pause(3000)
        .keys('Enter')
        .pause(2000)
        .click('.egeui-dialog .dialog-action button')
        // .keys('Control')
        // .keys('Enter')
        .pause(1000)
        .isExisting('.egeui-dialog').then(function(isExisting){
                var isExist = isExisting;
                console.log(isExist);
                isExist.should.equal(false);

                done();
        });
    });


    after(function(done){
        client.end(done);
        client = null;
    });
});
