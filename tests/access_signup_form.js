
export default function() {
  this.Given(/^I am an anonymous user$/, function () {
    // Check on the server if Meteor.user() is null
    const anonymous = server.execute(function() {
      return Meteor.user() === null
    })

    expect(anonymous).to.be.true
  });

  this.Given(/^I am on the homepage$/, function () {
    client.url('http://localhost:3000') // Navigate to app root url
    browser.getText('h1=Login').should.exist // Check for an h1 with text 'Login'
  });

  this.When(/^I click on the signup link$/, function () {
    browser.click('=Need an account?') // Click the sign up link
  });

  this.Then(/^I should see a signup form$/, function () {
    browser.getText('input').length.should.be.greaterThan(0) // Check for multiple inputs
    browser.getText('button=Create Account').should.exist // Check for the 'Create Account' button
  });
}