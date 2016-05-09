module.exports = function inviteCollabators(client, collaboratorsName, done) {
  return client
    .waitForExist('.egeui-dialog .egeui-dialog-title', 2000)
    .click('.collab-dialog .invite-btn')
    .pause(2000)
    .setValue('.contact-selector input', collaboratorsName)
    .pause(3000)
    .keys('Enter')
    .pause(2000)
    .click('.collab-dialog .invite-action .send')
    .isExisting('.collab-manage .collaborators li .user', function(err, isExisting){
        isExisting.should.equal(true);
    })
    // .click('.egeui-dialog .dialog-action .edit')
    .pause(3000)
    .click('.egeui-dialog .dialog-action .edit',function(){
      if(typeof done === 'function') {
        done();
      }
    });
};
