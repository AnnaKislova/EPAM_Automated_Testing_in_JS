Feature: Product Discovery

  Scenario Outline: Search returns products related to '<product>'
    Given the user is on the home page
    When the user enters "<product>" into the search field
    And the user clicks the Search button
    Then the user sees products related to "<product>" in the search results

Examples:
| product |
| hammer  |
| pliers  |
| wrench  |

  Scenario: Products are sorted by price in ascending order
    Given the user is on the home page
    When the user selects sorting by price in ascending order
    Then the user sees the products listed in ascending order by price

  Scenario: Total price updates correctly for rental products
    Given the logged-out user is on the rental product details page
    When the user selects a valid rental duration
    Then the total price updates correctly

Scenario: The user registers with valid personal data
  Given the user is on the register page
  When the user enters valid personal data
  Then the user is registered
  And redirected to the login form

Scenario: The user logs in with valid credentials
  Given the user is on the login page
  When the user enters a valid email and a valid password
  And the user clicks the login button
  Then the user is successfully logged in
  And redirected to the user page