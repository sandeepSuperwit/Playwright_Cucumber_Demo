Feature: Add To Cart
  As a username
  I want to search for items and add them to the cart
  So that I can check out with multiple products at the end

  Scenario: Add single item to the cart
    Given User is on the amazon home page and searched for "coding books javascript"
    When User open & adds products to cart "Learn Coding Basics in Hours with JavaScript"
    Then The products should get added to the cart

  Scenario: Add two items to the cart
    Given User is on the amazon home page and searched for "coding books javascript"
    When User open & adds products to cart "Coding with JavaScript For Dummies (For Dummies Series), Learn Coding Basics in Hours with JavaScript"
    Then The products should get added to the cart


