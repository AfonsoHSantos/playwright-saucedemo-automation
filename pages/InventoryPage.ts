import { Page, Locator } from '@playwright/test';

// Encapsula a página de produtos (/inventory.html)
export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;

  constructor(private page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async navigate() {
    await this.page.goto('/inventory.html');
  }

  // Adiciona um produto ao carrinho pelo nome exato exibido na página
  async addProductToCart(productName: string) {
    const card = this.page.locator('.inventory_item').filter({ hasText: productName });
    await card.getByRole('button', { name: /add to cart/i }).click();
  }

  // Remove um produto do carrinho pelo nome exato exibido na página
  async removeProductFromCart(productName: string) {
    const card = this.page.locator('.inventory_item').filter({ hasText: productName });
    await card.getByRole('button', { name: /remove/i }).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async openCart() {
    await this.cartIcon.click();
  }
}
