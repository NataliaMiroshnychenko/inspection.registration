const Page = require("../pages/Registration");
const {Builder} = require('selenium-webdriver');
const assert = require('assert');

describe('Registration flow test', function() {
  this.timeout(60000);
  let driver;
  let page;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    page = new Page(driver);
  });

  after(async function() {
    return driver.close();
  });
  it('should register new user (Test Case 1)', async function() {
      await page.load();
      await page.enterEmail('diana.semenova.dev@gmail.com');
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
      return assert.equal(isRegSuccessful, true, 'Successful registration message is shown');
  });
});