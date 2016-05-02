module.exports = function MoveToRoot(client, done) {
  client
    .waitForExist('.egeui-dialog .egeui-dialog-title', 4000)
    .click('.folders-tree > ul > li > a')
    .waitForExist('.egeui-dialog',4000)
    .click('.egeui-dialog .dialog-action .move', function(){
      if(typeof done === 'function') {
          done();
      }
    });
};
