module.exports = function newfile(client, fileName, done) {   //新建文件，client对象，文件夹名称，done
  return client
  .pause(5000)
  .waitForExist('#fileList',5000)
  .click('#create_new')
  .waitForExist('[data-type="1"]', 5000)
  .click('[data-type="1"]')
  .setValue('#new_item_name', fileName)
  .click('.submit', function(){
    client
    .pause(4000)
    .getText('.file-name', function(err,text){
      // console.log(text);
      text.should.equal(fileName.toString()+'.doc');

      if(typeof done === 'function') {
        done();
      }
    });
});
};
