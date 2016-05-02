module.exports = function setProperties(client, done) {
  client
  .waitForExist('.egeui-dialog .egeui-dialog-close', 3000)
  .setValue('.dialog-form .form-control-group .textarea-lg', '来自selenium测试的属性')
  .pause(2000)
  .click('.egeui-dialog .dialog-action .submit')
  .pause(4000, function(){
    if(typeof done === 'function') {
      done();
    }
  });
};
