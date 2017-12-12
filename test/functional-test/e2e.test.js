const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const By = webdriver.By;

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

describe('home page', () => {
  before(() => driver.navigate().to('http://localhost:5000'));

  it('displays a title', () => {
    return driver.getTitle()
      .then(title => expect(title).to.equal('Elasticsearch Console'));
  });

  it('says Hello, Elasticsearch!', () => {
    return driver.findElement(By.css('h1')).getText()
      .then(text => expect(text).to.equal('Hello, Elasticsearch!'));
  });

  it('gets records from the database', () => {
    return driver.findElement(By.css('#dbStats')).getText()
      .then(text => expect(text).to.equal('Found 1000 records'));
  });

  after(() => driver.quit());
});
