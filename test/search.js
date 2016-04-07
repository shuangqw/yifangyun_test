var login = require('../utils/login');
var newfolder = require('../utils/newfolder');
var should = require('chai').should();
var searchconfig = require('../searchconfig.js');
var folderName = Math.round(Math.random()*1000000);


describe('搜索', function(){
    var client;
    this.timeout(999999999);

    beforeEach(function(done){
        client = login(done);
    });

    it('搜索汉字', function(done){
        client
        .pause(5000)
        .waitForExist('#fileListView',8000)
        .setValue('#file_search', searchconfig.chineseword)
        .submitForm('#search_form', function(){
            client.pause(2000);
        })
        .pause(2000)
        .title(function(err,res){
            res.value.should.equal('搜索 "'+searchconfig.chineseword+'" - 亿方云');

            done();
        });
    });


    it('搜索英文', function(done){
        client
        .waitForExist('#fileListView',8000)
        .setValue('#file_search', searchconfig.englishword)
        .submitForm('#search_form', function(){
            client.pause(1000);
        })
        .pause(5000)
        .title(function(err,res){
            res.value.should.equal('搜索 "'+searchconfig.englishword+'" - 亿方云');

            done();
        });
    });


    it('搜索数字', function(done){
        client
        .waitForExist('#fileListView',8000)
        .setValue('#file_search', searchconfig.numberword)
        .submitForm('#search_form', function(){
            client.pause(1000);
        })
        .pause(5000)
        .title(function(err,res){
            res.value.should.equal('搜索 "'+searchconfig.numberword+'" - 亿方云');

            done();
        });
    });


    it('搜索姓名', function(done){
        client
        .waitForExist('#fileListView',8000)
        .setValue('#file_search', searchconfig.nameword)
        .submitForm('#search_form', function(){
            client.pause(1000);
        })
        .pause(5000)
        .title(function(err,res){
            res.value.should.equal('搜索 "'+searchconfig.nameword+'" - 亿方云');

            done();
        });
    });


    it('搜索空值', function(done){
        client
        .waitForExist('#fileListView',8000)
        .setValue('#file_search', searchconfig.noword)
        .submitForm('#search_form', function(){
            client.pause(1000);
        })
        .pause(5000)
        .title(function(err,res){
            res.value.should.not.equal('搜索 - 亿方云');

            done();
        });
    });


    it('搜索新建的文件夹能否搜索到', function(done){
        newfolder(client, folderName, done);
        client
        .pause(5000)
        .waitForExist('#fileListView',8000)
        .setValue('#file_search', folderName)
        .submitForm('#search_form', function(){
            client.pause(1000);
        })
        .pause(8000)
        .waitForExist('#fileList',9000)
        .getText('#fileList .list:first-child .file-name', function(err,text){
            text.should.equal(folderName.toString());
            // console.log(text[0]);
            // console.log(folderName.toString());

            done();
        });
    });


    afterEach(function(done){
        client.end(done);
        client = null;
    });
});
