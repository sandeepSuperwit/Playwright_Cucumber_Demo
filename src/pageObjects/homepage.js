const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async navigateToAmazonHomePage() {
    await this.page.goto("https://www.amazon.com/");
    await expect(this.page.locator("#nav-logo-sprites")).toBeVisible({ timeout: 45000});
  }

  async searchForProduct(searchTerm) {
    await this.page.locator("#twotabsearchtextbox").fill(searchTerm);
    await this.page.locator("#nav-search-submit-button").click();
    await expect(this.page.locator(`:has-text('results for "${searchTerm}"')`).nth(0)).toBeVisible({ timeout: 45000});
    await expect(this.page.locator("text='Results'")).toBeVisible();
  }

  async addProductToCart(productNames) {
    const totalProduct = productNames.length;
    let iterationCount = 0;
    do{
      await this.page.locator(`text=${productNames[iterationCount].trim()}`).nth(0).click();
      await this.page.locator("#add-to-cart-button").click();
      await expect(this.page.locator("#nav-cart-count")).toHaveText(`${iterationCount + 1}`);
      await this.page.goBack();
      await this.page.locator("#nav-search-submit-button").click();
      iterationCount++;
    }
    while(iterationCount < totalProduct) 
  }

  async verifyProductAddedToCart(productNames) {
    const totalProduct = productNames.length;
    await expect(this.page.locator("#nav-cart-count")).toHaveText(`${totalProduct}`);
    await this.page.locator("#nav-cart-count").click();

    let iterationCount = 0;
    do{
      expect(await this.page.locator(`text='${productNames[iterationCount].trim()}'`).count()).toBeGreaterThan(0);
      iterationCount++;
    }
    while(iterationCount < totalProduct) 
  }
}

module.exports = HomePage;