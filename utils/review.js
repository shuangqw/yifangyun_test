module.exports = function newReview(client, reviewName, reviewer, done) {
  return client
  .waitForExist('.egeui-dialog .review-dialog',8000)
  .setValue('.egeui-dialog .review-dialog #commonform #title', reviewName)
  .click('.egeui-dialog .review-dialog .form-control-group .contact-selector >input')
  .setValue('.egeui-dialog .review-dialog .form-control-group .contact-selector >input', reviewer)
  .pause(3000)
  .keys('Enter')
  .pause(2000)
  .click('.egeui-dialog .dialog-action .send')
  .pause(5000)
  .isExisting('.egeui-dialog .review-dialog', function(err,isExisting){
    console.log(arguments);
    isExisting.should.equal(false);

    if(typeof done === 'function') {
      done();
    }
  });
};
