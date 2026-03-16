import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  // Fixture de estado: adiciona um produto ao carrinho antes do teste
  // e navega para o carrinho automaticamente. Só executa se solicitada.
  productInCart: void;
};

export const test = base.extend<MyFixtures>({
  // Fixtures de POM: instanciadas sob demanda, somente se o teste as solicitar
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Fixture de estado: substitui o beforeEach com isolamento real.
  // Adiciona "Sauce Labs Backpack" e navega para o carrinho.
  // O teardown (limpeza) ocorre automaticamente após o teste.
  productInCart: async ({ inventoryPage, cartPage }, use) => {
    await inventoryPage.navigate();
    await inventoryPage.addProductToCart('Sauce Labs Backpack'); // arrange
    await cartPage.navigate();
    await use();                                                  // executa o teste
    // Teardown: volta ao inventário para garantir estado limpo para o próximo teste
    await inventoryPage.navigate();
  },
});

export { expect } from '@playwright/test';
