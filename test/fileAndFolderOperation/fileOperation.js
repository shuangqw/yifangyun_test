var login = require('../../utils/login');
var newFile = require('../../utils/newFile');
var config = require('../../config');
var should = require('chai').should();
var cheerio = require('cheerio');
var fileName = Math.round(Math.random()*1000000);
var options = {
    desiredCapabilities: {                    //调用chrome浏览器
        browserName: 'chrome'
    }
};

describe('文件相关操作', function(){
    var client;
    this.timeout(999999999);

    before(function(done){
        client = login(config.log,options);

        newFile(client,fileName,done);
    });

    it.skip('新建一个word文档', function(done){
        client
        .pause(5000)
        .waitForExist('#fileList',5000)
        .click('#create_new')
        .waitForExist('[data-type="1"]', 5000)
        .click('[data-type="1"]')
        .setValue('#new_item_name', fileName)
        .click('.submit', function(){
            client
            .pause(2000)
            .getText('.file-name', function(err,text){
                text[0].should.equal(fileName.toString()+'.doc');

                done();
            });
        });
    });

    it('检查菜单栏是否正确', function(done){
        client
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .pause(2000)
        .isExisting('#context_menu .share', function(err, isExisting){
            console.log(arguments);

            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .review', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .comment', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .preview', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .edit', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .download', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .update-version', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .tags', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .favorite', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .separator', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .delete', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .rename', function(err, isExisting){
            isExisting.should.equal(true);
        })
        .isExisting('#context_menu .properties', function(err, isExisting){
            isExisting.should.equal(true);

            done();
        });
    });

    it('加入收藏', function(done){
        client
        .pause(2000)
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .pause(2000)
        .waitForExist('#context_menu .favorite', 2000)
        .click('#context_menu .favorite')
        .pause(2000)
        .getHTML('.file-list-view .list:first-child .file-item .item-name .icon-favorite', function(err,html){
            html.indexOf('取消收藏').should.not.equal(-1);

            done();
        });
    });

    it('取消收藏', function(done){
        client
        .pause(2000, function(){
            console.log('试试');
        })
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .pause(2000, function(){
            console.log('ss');
        })
        .waitForExist('#context_menu .favorite', 2000)
        .click('#context_menu .favorite',function(){
            console.log('favorite');
        })
        .pause(2000)
        .getHTML('.file-list-view .list:first-child .file-item .item-name .icon-favorite', function(err,html){
            html.indexOf('加入收藏').should.not.equal(-1);

            done();
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
        .click('.egeui-dialog .dialog-action .send')
        .pause(5000)
        .isExisting('.egeui-dialog .review-dialog', function(err,isExisting){
            console.log(arguments);
            isExisting.should.equal(false);

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
        .isExisting('.file-list-view .list:first-child .file-item .action-list .icon-file-locked').then(function(err,isExisting){
                isExisting.should.equal(true);

                done();
        });
    });


    it.skip('移动文件', function(done){
        client
        .pause(2000)
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .pause(2000)
        .waitForExist('#context_menu .move', 2000)
        .click('#context_menu .move')
        .waitForExist('.egeui-dialog .egeui-dialog-title', 4000);
    });

    it('重命名', function(done){
        client
        .pause(2000)
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .pause(2000)
        .waitForExist('#context_menu .rename', 2000)
        .click('#context_menu .rename')
        .pause(2000)
        .setValue('#fileList > .list:first-child > .file-item .item-rename .input-primary', '重命名'+fileName)
        .click('#fileList > .list:first-child > .file-item .item-rename .submit', function(){
            client
            .pause(2000)
            .getText('.file-name', function(err,text){
                text[0].should.equal('重命名'+fileName.toString()+'.doc');

                done();
            });
        });
    });

    it('更改文件属性', function(done){
        client
        .pause(2000)
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .pause(2000)
        .waitForExist('#context_menu .properties', 2000)
        .click('#context_menu .properties')
        .pause(2000)
        .waitForExist('.egeui-dialog .egeui-dialog-close', 3000)
        .setValue('.dialog-form .form-control-group .textarea-lg', '来自selenium测试的属性')
        .click('.egeui-dialog .dialog-action .submit')
        .pause(3000)
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .pause(2000)
        .waitForExist('#context_menu .properties', 2000)
        .click('#context_menu .properties')
        .pause(2000)
        .waitForExist('.egeui-dialog .egeui-dialog-close', 3000)
        .getText('.dialog-form .form-control-group .textarea-lg', function(err,properties){
            properties.should.equal('来自selenium测试的属性');
            // console.log(arguments);

            client
            .click('.egeui-dialog .dialog-action .submit')
            .pause(2000);

            done();
        });
    });

    it('删除文件', function(done){
        client
        .pause(2000)
        .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
        .pause(2000)
        .waitForExist('#context_menu .delete', 2000)
        .pause(2000)
        .click('#context_menu .delete')
        // .pause(2000)
        .waitForExist('.egeui-confirmbox', 2000)
        .click('.egeui-confirmbox .egeui-confirmbox-action .confirm')
        .pause(2000)
        .getText('#fileList > .list:first-child .file-name', function(err,text){
                text[0].should.not.equal(fileName.toString()+'.doc');

                done();
        });
    });

    after(function(done){
        client.end(done);
        client = null;
    });
});
