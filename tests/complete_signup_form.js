/**
 * @name waitForUrlToChangeTo
 * @description Wait until the URL changes to match a provided regex
 * @param {RegExp} urlRegex wait until the URL changes to match this regex
 * @returns {!webdriver.promise.Promise} Promise
 */
function waitForUrlToChangeTo(urlRegex) {
  var currentUrl;

  return browser.getUrl().then(function storeCurrentUrl(url) {
      currentUrl = url;
    }
  ).then(function waitForUrlToChangeTo() {
      return browser.wait(function waitForUrlToChangeTo() {
        return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
          return urlRegex.test(url);
        });
      });
    }
  );
}

export default function () {
  this.Given(/^I am viewing the signup form$/, function () {
    server.call('resetDatabase') // See imports/api/generateData.app-tests.js
    client.url('http://localhost:3000/signup')
  });

  this.Given(/^I enter a valid email and password$/, function () {
    browser.setValue('input[name="email"]', 'test1@test.com')
    browser.setValue('input[name="password"]', 'password123')
  });

  this.When(/^I submit the form$/, function () {
    browser.click('button=Create Account')
  });

  this.Then(/^I should see a dashboard header$/, function () {
    browser.waitUntil(() => browser.getUrl() === 'http://localhost:3000/')
    browser.getText('h1').should.equal('Dashboard')
  });

  this.Then(/^I should see a logout button$/, function () {
    browser.getText('button=Logout').should.exist
  });
}