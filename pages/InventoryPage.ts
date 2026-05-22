import { Page, Locator } from '@playwright/test';

// Encapsula a página de produtos (/inventory.html)
export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(private page: Page) {
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async navigate() {
    await this.page.goto('/inventory.html');
  }

  /**
   * Adiciona um produto ao carrinho pelo nome exato exibido na página
   * @param productName - Nome exato do produto conforme exibido na página
   * (ex: 'Sauce Labs Backpack', 'Sauce Labs Bike Light')
   * @example
   * await inventoryPage.addProductToCart('Sauce Labs Backpack');
   */
  async addProductToCart(productName: string) {
    const card = this.page.locator('.inventory_item').filter({ hasText: productName });
    await card.getByRole('button', { name: /add to cart/i }).click();
  }

  /**
   * Remove um produto do carrinho pelo nome exato exibido na página
   * @param productName - Nome exato do produto conforme exibido na página
   * (ex: 'Sauce Labs Backpack', 'Sauce Labs Bike Light')
   * @example
   * await inventoryPage.removeProductFromCart('Sauce Labs Backpack');
   */
  async removeProductFromCart(productName: string) {
    const card = this.page.locator('.inventory_item').filter({ hasText: productName });
    await card.getByRole('button', { name: /remove/i }).click();
  }

  /**
   * Ordena os produtos na página de inventário
   * @param option - Opção de ordenação:
   * - 'az': Nome (A a Z)
   * - 'za': Nome (Z a A)
   * - 'lohi': Preço (menor para maior)
   * - 'hilo': Preço (maior para menor)
   * @example
   * await inventoryPage.sortBy('lohi'); // Ordena por preço crescente
   */
  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async openCart() {
    await this.cartIcon.click();
  }
}
