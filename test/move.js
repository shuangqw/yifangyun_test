var login = require('../utils/login');
var newfolder = require('../utils/newfolder');
var should = require('chai').should();
// var searchconfig = require('../searchconfig.js');
// var folderName = Math.round(Math.random()*1000000);


describe('搜索', function(){
    var client;
    this.timeout(999999999);

    beforeEach(function(done){
        client = login(done);
    });

    it('多选文件夹', function(done){
        client
        .pause(5000)
        .waitForExist('#fileListView',8000)
        .click('#fileList .list:first-child .item')
        .click('#fileList .list:first-child .file-item contains "上线" = true .select-check',function(){
            console.log('sss');

            done();
        });
    });


    afterEach(function(done){
        client.end(done);
        client = null;
    });
});
