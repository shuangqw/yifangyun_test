var login = require('../../utils/login');
var newFolder = require('../../utils/newFolder');
var moveToRoot = require('../../utils/moveToRoot');
var copyToRoot = require('../../utils/copyToRoot');
var addTags = require('../../utils/addTags');
var setProperies = require('../../utils/setProperies');
var inviteCollabators = require('../../utils/inviteCollabators');
var config = require('../../config');
var should = require('chai').should();
var cheerio = require('cheerio');
var folderName = Math.round(Math.random()*1000000);
var options = {
    desiredCapabilities: {                    //调用chrome浏览器
        browserName: 'chrome'
    }
};


describe('文件夹操作', function(done){
  var client;
  this.timeout(99999999);

  before(function(done){
    client = login(config.staging,options);

    newFolder(client,folderName,done);
  });

  it.skip('验证右键菜单栏', function(done){
    client
    .pause(2000)
    .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
    .pause(2000)
    .isExisting('#context_menu .invite-collab', function(err, isExisting){
        isExisting.should.equal(true);
    })
    .isExisting('#context_menu .change-owner', function(err, isExisting){
        isExisting.should.equal(true);
    })
    .isExisting('#context_menu .download', function(err, isExisting){
        isExisting.should.equal(true);
    })
    .isExisting('#context_menu .tags', function(err, isExisting){
        isExisting.should.equal(true);
    })
    .isExisting('#context_menu .favorite', function(err, isExisting){
        isExisting.should.equal(true);
    })
    .isExisting('#context_menu .sync', function(err, isExisting){
        isExisting.should.equal(true);
    })
    .isExisting('#context_menu .move-copy', function(err, isExisting){
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

  it.skip('移动文件夹至根目录', function(done){
    client
    .pause(2000)
    .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
    .pause(2000)
    .waitForExist('#context_menu .move', 2000)
    .click('#context_menu .move');

    moveToRoot(client, done);
  });

  it('复制文件夹至根目录', function(done){
    client
    .pause(2000)
    .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
    .pause(2000)
    .waitForExist('#context_menu .copy', 2000)
    .click('#context_menu .copy');

    copyToRoot(client, done);
   });

  after(function(done){
    client.end(done);
    client = null;
  });

  it.skip('加入收藏', function(done){
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

  it.skip('取消收藏', function(done){
    client
    .pause(2000)
    .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
    .pause(2000)
    .waitForExist('#context_menu .favorite', 2000)
    .click('#context_menu .favorite')
    .pause(2000)
    .getHTML('.file-list-view .list:first-child .file-item .item-name .icon-favorite', function(err,html){
        html.indexOf('加入收藏').should.not.equal(-1);

        done();
    });
  });

  it('重命名', function(done){
    client
    .pause(2000)
    .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
    .pause(2000)
    .waitForExist('#context_menu .rename', 2000)
    .click('#context_menu .rename')
    .pause(2000)
    .setValue('#fileList > .list:first-child > .file-item .item-rename .input-primary', '重命名'+folderName)
    .click('#fileList > .list:first-child > .file-item .item-rename .submit', function(){
        client
        .pause(2000)
        .getText('.file-name', function(err, text){
            text[0].should.equal('重命名'+folderName.toString());

            done();
        });
    });
  });

  it.only('添加标签', function(done){
    client
    .pause(2000)
    .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
    .pause(2000)
    .waitForExist('#context_menu .tags', 2000)
    .click('#context_menu .tags');

    addTags(client, 'selenium的测试标签');

    client
    .pause(3000)
    .getText('#fileList > .list:first-child > .file-item .tags li a', function(err, text){
        text[0].should.equal('selenium的测试标签');

        done();
    });
  });

  it('更改文件夹属性', function(done){
    client
    .pause(2000)
    .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
    .pause(2000)
    .waitForExist('#context_menu .properties', 2000)
    .click('#context_menu .properties');

    setProperies(client, done);
  });

  it('邀请协作者', function(done){
    client
    .pause(2000)
    .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
    .pause(2000)
    .waitForExist('#context_menu .invite-collab', 2000)
    .pause(2000)
    .click('#context_menu .invite-collab');

    inviteCollabators(client, 'com' ,done);
  });

  it('转交文件夹所有权',function(done){
    client
    .pause(2000)
    .click('#fileList > .list:first-child > .file-item .icon-file-arrow-down')
    .pause(2000)
    .waitForExist('#context_menu .change-owner', 2000)
    .pause(2000)
    .click('#context_menu .change-owner')
    .waitForExist('.egeui-dialog .egeui-dialog-title', 2000)
    .setValue('.change-owner-dialog .contact-control-group .contact-selector input', 'com')
    .pause(2000)
    .keys('Enter')
    .pause(2000)
    .click('.egeui-dialog .dialog-action .submit')
    .pause(3000)
    .isExisting('#fileList > .list:first-child > .file-item .icon-type-m-collab-folder', function(err, isExisting){
        isExisting.should.equal(true);

        done();
    });
  });


});
