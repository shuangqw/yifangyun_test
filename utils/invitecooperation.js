module.exports = function newfolder(client,folderName,collaboratorsName,done) {   //新建协作文件夹，client对象，文件夹名称，done
    client
        .pause(8000)
        .click('#create_new')
        .waitForExist('[data-type="4"]')
        .click('[data-type="4"]')
        .pause(1000)
        .setValue('.input-primary', folderName+'协作')
        .click('.egeui-dialog-content .dialog-action .submit')
        .pause(1000)
        .setValue('.add-new-collab .collab-select .contact-selector input', collaboratorsName)
        .pause(1000)
        .keys('Enter')
        .click('.dialog-action .send');
};
