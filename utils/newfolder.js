module.exports = function newfolder(client, folderName, done) {   //新建文件夹，client对象，文件夹名称，done
  client
  .pause(5000)
  .waitForExist('#fileList',5000)
  .click('#create_new')
  .waitForExist('[data-type="0"]', 5000)
  .click('[data-type="0"]')
  .setValue('#new_item_name', folderName)
  .click('.submit', function(){
    client
    .pause(4000)
    .getText('.file-name', function(err,text){
      text[0].should.equal(folderName.toString());

      if(typeof done === 'function') {
        done();
      }
    });
  });
};
