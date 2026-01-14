Feature: User authentication

  As a registered banking customer
  I want to log in to the Zero Bank application
  So that I can securely access my account information

  Scenario: Successful login using valid credentials
    Given user launches the banking application
    When user logs in with valid credentials
    Then user should be logged in successfully
