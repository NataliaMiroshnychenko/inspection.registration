const {By, until} = require('selenium-webdriver');

class Page {
  constructor(driver) {
    this.driver = driver;
  }

  async load() {
    return this.driver.get('http://inspections.staging.brdo.com.ua/site/signup');
  }

  async enterEmail(email) {
    return this.driver.findElement(By.css('#signupform-email')).sendKeys(email);
  }

  async enterLastName(lastName) {
    return this.driver.findElement(By.css('#signupform-last_name')).sendKeys(lastName);
  }

  async enterFirstName(firstName) {
    return this.driver.findElement(By.css('#signupform-first_name')).sendKeys(firstName);
  }

  async enterPatronymicName(patronymicName) {
    return this.driver.findElement(By.css('#signupform-patronymic_name')).sendKeys(patronymicName);
  }

  async enterPosition(position) {
    return this.driver.findElement(By.css('#signupform-position')).sendKeys(position);
  }

  async enterPhone(phone) {
    return this.driver.findElement(By.css('#signupform-phone')).sendKeys(phone);
  }

  async enterPassword(password) {
    return this.driver.findElement(By.css('#signupform-password')).sendKeys(password);
  }

  async selectBodytype(bodyType) {
    await this.driver.findElement(By.css('#select2-signupform-regulator_type-container')).click();
    const element = await this.driver.findElement(By.xpath(`//li[contains(text(), '${bodyType}')]`));
    await this.driver.wait(until.elementIsVisible(element), 1000);
    return element.click();
  }

  async selectAuthbody(authBody) {
    await this.driver.findElement(By.css('#select2-signupform-regulator_id-container')).click();

    const element = await this.driver.findElement(By.xpath(`//li[contains(text(), '${authBody}')]`));
    await this.driver.wait(until.elementIsVisible(element), 1000);
    return element.click();
  }

  async selectAreacontrol(areaControl) {
    await this.driver.findElement(By.css('.select2-search__field')).click();
    const element = await this.driver.findElement(By.xpath(`//li[contains(text(), '${areaControl}')]`));
    await this.driver.wait(until.elementIsVisible(element), 1000);
    return element.click();
  }

  async verifyCaptcha() {
    const element = await this.driver.findElement(By.css('iframe'));
    await this.driver.switchTo().frame(element);
    await this.driver.findElement(By.css('.recaptcha-checkbox-border')).click();
    return this.driver.switchTo().defaultContent();
  }

  async goNext() {
    await this.driver.findElement(By.xpath("//button[contains(text(), 'Далі')]")).click();
    return this.driver.sleep(5000);
  }

  async isRegistrationSuccessful() {
    const textElement = await this.driver.findElements(By.xpath("//*[contains(text(), 'Реєстрація успішна')]"));
    return textElement.length > 0;
  }

  async isLastNameInvalid() {
    const textElement = await this.driver.findElements(By.xpath("//*[contains(text(), 'Значення \"Прізвище\" повинно містити мінімум 3 символа.')]"));
    return textElement.length > 0;
  }

  async isEmailInvalid() {
    const textElement = await this.driver.findElements(By.xpath("//*[contains(text(), 'Значення \"Емейл\" не є правильною email адресою.')]"));
    return textElement.length > 0;
  }
}

module.exports = Page;