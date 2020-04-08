const Page = require("../pages/Registration");
const {Builder} = require('selenium-webdriver');
const assert = require('assert');

describe('Registration flow test with invalid field', function() {
  this.timeout(60000);
  let driver;
  let page;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.sleep(5000);
    page = new Page(driver);
  });

  after(async function() {
   return driver.close();
  });

  async function submitForm(formData) {
    await page.load();
    await page.enterEmail(formData.email);
    await page.enterLastName(formData.lastName);
    await page.enterFirstName(formData.firstName);
    await page.enterPatronymicName(formData.patromicName);
    await page.enterPosition(formData.position);
    await page.enterPhone(formData.phone);
    await page.enterPassword(formData.password);
    await page.selectBodytype(formData.bodyType);
    await page.selectAuthbody(formData.authType);
    await page.selectAreacontrol(formData.areaControl);
    await page.verifyCaptcha();
    await page.goNext();
  }

  it('should not allow register user with wrong last name (Test case 2)', async function() {
    const formData = {
      email: 'diana.semenova.dev@gmail.com',
      lastName: 'Се',
      firstName: 'Діана',
      patromicName: 'Сергіївна',
      position: 'Головний спеціаліст',
      phone: '0970000000',
      password: '123456',
      bodyType: 'Центральний',
      authType: 'Міністерство внутрішніх справ України',
      areaControl: 'Провадження охоронної діяльності, що підлягає ліцензуванню',
    };
    await submitForm(formData);
    const isRegSuccessful = await page.isRegistrationSuccessful();
    const isLastNameInvalid = await page.isLastNameInvalid();
    await assert.equal(isLastNameInvalid, true, 'Last name invalid message is shown');
    return assert.equal(isRegSuccessful, false, 'Successful registration message isn\'t shown')
  });

  it('should not allow register user with wrong email (Test case 3)', async function() {
    const formData = {
      email: 'diana.semenova.dev',
      lastName: 'Семенова',
      firstName: 'Діана',
      patromicName: 'Сергіївна',
      position: 'Головний спеціаліст',
      phone: '0970000000',
      password: '123456',
      bodyType: 'Центральний',
      authType: 'Міністерство внутрішніх справ України',
      areaControl: 'Провадження охоронної діяльності, що підлягає ліцензуванню',
    };
    await submitForm(formData);
    const isRegSuccessful = await page.isRegistrationSuccessful();
    const isEmailInvalid = await page.isEmailInvalid();
    await assert.equal(isEmailInvalid, true, 'Email invalid message is shown');
    return assert.equal(isRegSuccessful, false, 'Successful registration message isn\'t shown');
  });
});