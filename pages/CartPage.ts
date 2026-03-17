import { Page, Locator } from '@playwright/test';

// Encapsula a página do carrinho (/cart.html)
export class CartPage {
  readonly title: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItems: Locator;

  constructor(private page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartItems = page.locator('.cart_item');
  }

  async navigate() {
    await this.page.goto('/cart.html');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Remove um item específico do carrinho
   * @param productName - Nome exato do produto a ser removido do carrinho
   * (ex: 'Sauce Labs Backpack', 'Sauce Labs Bike Light')
   * @example
   * await cartPage.removeItem('Sauce Labs Backpack');
   */
  async removeItem(productName: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: productName });
    await item.getByRole('button', { name: /remove/i }).click();
  }
}
