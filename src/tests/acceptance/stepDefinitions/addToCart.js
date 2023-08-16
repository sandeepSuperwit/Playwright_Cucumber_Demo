const { Given, When, Then } = require("@cucumber/cucumber");
const HomePage = require("../../../pageObjects/homepage");

let productNames = [];

Given("User is on the amazon home page and searched for {string}", async function (searchTerm) {
  const homePage = new HomePage(page);
  await homePage.navigateToAmazonHomePage();
  await homePage.searchForProduct(searchTerm);
});

When("User open & adds products to cart {string}", async function (addedProductNames) {
  const homePage = new HomePage(page);
  productNames = addedProductNames.split(",");
  console.log(productNames);
  await homePage.addProductToCart(productNames);
});

Then("The products should get added to the cart", async function () {
  console.log(productNames);
  const homePage = new HomePage(page);
  await homePage.verifyProductAddedToCart(productNames);
});
