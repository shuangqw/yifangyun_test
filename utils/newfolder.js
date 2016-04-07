module.exports = function newfolder(client,folderName,done) {   //新建文件夹，client对象，文件夹名称，done
        client
        .pause(8000)
        .click('#create_new')
        .waitForExist('[data-type="0"]',8000)
        .click('[data-type="0"]')
        .setValue('#new_item_name', folderName)
        .click('.submit',function(){
          done();
        });
};
