Feature: User Signup
  As an anonymous user
  I want to be able to register
  So I can access my personal data

  @watch
  Scenario: Access signup form
    Given I am an anonymous user
    And I am on the homepage
    When I click on the signup link
    Then I should see a signup form

  @watch
  Scenario: Complete signup form
    Given I am viewing the signup form
    And I enter a valid email and password
    When I submit the form
    Then I should see a dashboard header
    And I should see a logout button
