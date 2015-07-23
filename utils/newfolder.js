module.exports = function newfolder(client,folderName,done) {
    client
        .pause(8000)
        .waitForExist('#fileListView',8000)
        .click('#new_folder')
        .setValue('#new_item_name', folderName)
        .click('[data-radio-value="create_folder"]')
        .click('.submit', function(){
            client.pause(1000);
            // console.log(arguments);
        });
};
