Feature: Product Discovery

  Scenario: Search returns products related to 'hammer'
    Given the user is on the home page
    When the user enters "<product>" into the search field
    And the user clicks the Search button
    Then the user sees products related to "<product>" in the search results

Examples:
| product |
| hammer  |
| pliers  |
| wrench  |