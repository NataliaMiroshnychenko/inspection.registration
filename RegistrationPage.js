const {By} = require('selenium-webdriver');

class Page {
  constructor(driver) {
    this.driver = driver;
  }

  async load() {
    return await this.driver.get('http://inspections.staging.brdo.com.ua/site/signup');
  }

  async enterEmail(email) {
    return await this.driver.findElement(By.css('#signupform-email')).sendKeys(email);
  }

  async enterLastName(lastName) {
    return await this.driver.findElement(By.css('#signupform-last_name')).sendKeys(lastName);
  }

  async enterFirstName(firstName) {
    return await this.driver.findElement(By.css('#signupform-first_name')).sendKeys(firstName);
  }

  async enterPatronymicName(patronymicName) {
    return await this.driver.findElement(By.css('#signupform-patronymic_name')).sendKeys(patronymicName);
  }

  async enterPosition(position) {
    return await this.driver.findElement(By.css('#signupform-position')).sendKeys(position);
  }

  async enterPhone(phone) {
    return await this.driver.findElement(By.css('#signupform-phone')).sendKeys(phone);
  }

  async enterPassword(password) {
    return await this.driver.findElement(By.css('#signupform-password')).sendKeys(password);
  }

  async selectBodytype(bodytype) {
    await this.driver.findElement(By.css('#select2-signupform-regulator_type-container')).click();
    return this.driver.findElement(By.css("[id^='select2-signupform-regulator_type-result-']")).click();
  }

  async selectAuthbody(authbody) {
    await this.driver.findElement(By.css('#select2-signupform-regulator_id-container')).click();
    return await this.driver.findElement(By.css('[id^="select2-signupform-regulator_id-result-"]')).click();
  }

  async selectAreacontrol(areacontrol) {
    await this.driver.findElement(By.css('.select2-search__field')).click();
    return await this.driver.findElement(By.xpath(`//li[contains(text(), '${areacontrol}')]`)).click();
  }

  async verifyCaptcha() {
    const element = await this.driver.findElement(By.css('iframe'));
    await this.driver.switchTo().frame(element);
    await this.driver.findElement(By.css('.recaptcha-checkbox-border')).click();
    return await this.driver.switchTo().defaultContent();
  }

  async goNext() {
    return await this.driver.findElement(By.xpath("//button[contains(text(), 'Далі')]")).click();
  }

  async isRegistrationSuccessful() {
    await this.driver.sleep(3000);
    const textElement = await this.driver.findElements(By.xpath("//*[contains(text(), 'Реєстрація успішна')]"));
    return textElement.length > 0;
  }
}

module.exports = Page;