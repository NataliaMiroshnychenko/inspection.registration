const Page = require("./RegistrationPage");
const {Builder} = require('selenium-webdriver');
const assert = require('assert');


describe('Registration flow test', function() {
  it('should register new user', async function() {
    this.timeout(0);
    let driver = await new Builder().forBrowser('chrome').build();
    const page = new Page(driver);

    try {
      await page.load();
      await page.enterEmail('diana.semenova.dev');
      await page.enterLastName('Семенова');
      await page.enterFirstName('Діана');
      await page.enterPatronymicName('Сергіївна');
      await page.enterPosition('Головний спеціаліст');
      await page.enterPhone('0970000000');
      await page.enterPassword('123456');
      await page.selectBodytype('Центральний');
      await page.selectAuthbody('Міністерство внутрішніх справ України');
      await page.selectAreacontrol('Провадження охоронної діяльності, що підлягає ліцензуванню');
      await page.verifyCaptcha();
      await page.goNext();
      const isRegSuccessful = await page.isRegistrationSuccessful();
      return assert.equal(isRegSuccessful, false, 'Successful registration message is shown')
    } finally {
      // await driver.quit();
    }
    return false;
  });
});