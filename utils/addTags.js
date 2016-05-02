module.exports = function addTags(client, tagName, done) {
  client
    .pause(2000)
    .waitForExist('.egeui-dialog .egeui-dialog-title', 2000)
    .setValue('.tag-dialog .tag-editor .editor input', tagName)
    .pause(2000)
    .keys('Enter')
    .pause(2000)
    .click('.egeui-dialog .dialog-action .save', function(){
      if(typeof done === 'function') {
          done();
      }
    });
};
