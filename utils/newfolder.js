module.exports = function newfolder(client,folderName,done) {
    client
        .waitForExist('#fileListView',8000)
        .waitForExist('#new_folder',8000)
        .click('#new_folder')
        .setValue('#new_item_name', folderName)
        .click('[data-radio-value="create_folder"]')
        .click('.submit', function(){
            client
            .pause(1000)
            .getText('.file-name', function(err,text){
                text[0].should.equal(folderName.toString());

                done();
            });
        });
};
