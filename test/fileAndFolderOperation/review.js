var login = require('../../utils/login');
var should = require('chai').should();
var cheerio = require('cheerio');
var fileName = Math.round(Math.random()*1000000);

describe('文件相关操作', function(){
    var client;
    this.timeout(999999999);

    before(function(done){
        client = login(done);
    });

    it('新建一个word文档', function(done){
        client
        .pause(5000)
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
        .pause(2000)
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .waitForExist('#context_menu .review', 2000)
        .click('#context_menu .review')
        .waitForExist('.egeui-dialog .review-dialog',8000)
        .setValue('.egeui-dialog .review-dialog #commonform #title', '审阅测试标题')
        .click('.egeui-dialog .review-dialog .form-control-group .contact-selector >input')
        .setValue('.egeui-dialog .review-dialog .form-control-group .contact-selector >input', 'com')
        .pause(3000)
        .keys('Enter')
        .pause(2000)
        .click('.egeui-dialog .dialog-action button')
        .pause(1000)
        .isExisting('.egeui-dialog').then(function(isExisting){
                var isExist = isExisting;
                console.log(isExist);
                isExist.should.equal(false);

                done();
        });
    });

    it('添加评论', function(done){         //通过右侧下三角处的右侧菜单进行评论操作
        client
        .pause(2000)
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .waitForExist('#context_menu .comment', 2000)
        .click('#context_menu .comment')
        .waitForExist('#fileList > .list:first-child > .comments',8000)
        .setValue('#fileList > .list:first-child > .comments .comment-input', '来自selenium的评论')
        .click('#fileList > .list:first-child > .comments .addComment')
        .pause(2000)
        .getText('#fileList > .list:first-child > .comments .comment-list li:first-child .comment-content',function(err, res){
            res.should.equal('来自selenium的评论');

            done();
        });
    });

    it.skip('锁定文件', function(done){         //仅协作文件可锁定
        client
        .pause(2000)
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .waitForExist('#context_menu .locked', 2000)
        .click('#context_menu .locked .icon', function(){
            console.log('sss');
        })
        .waitForExist('.egeui-confirmbox .egeui-confirmbox-title',8000)
        .click('.egeui-confirmbox .egeui-confirmbox-action button:last-child', function(){
            console.log('sss');
        })
        .pause(2000)
        .isExisting('.file-list-view .list:first-child .file-item .action-list .icon-file-locked').then(function(isExisting){
                var isExist = isExisting;
                console.log(isExist);
                isExist.should.equal(true);

                done();
        });
    });

    after(function(done){
        client.end(done);
        client = null;
    });
});
