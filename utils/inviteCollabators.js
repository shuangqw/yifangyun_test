module.exports = function inviteCollabators(client, collaboratorsName, done) {   //新建协作文件夹，client对象，文件夹名称，done
  client
    .waitForExist('.egeui-dialog .egeui-dialog-title', 2000)
    .click('.collab-dialog .invite-btn')
    .pause(2000)
    .setValue('.contact-selector input', 'collaboratorsName')
    .pause(3000)
    .keys('Enter')
    .pause(2000)
    .click('.collab-dialog .invite-action .send')
    .isExisting('.collab-manage .collaborators li .user', function(err, isExisting){
        isExisting.should.equal(true);
    })
    .click('.egeui-dialog .dialog-action .edit', function(){
      if(typeof done === 'function') {
          done();
      }
    });
};
