Feature: Feedback submission
  As a bank customer
  I want to submit feedback
  So that I can share my experience with the bank

  Scenario: Submit feedback successfully
    Given user is on home page
    When user navigates to feedback page
    And user submits feedback
    Then feedback should be submitted successfully
