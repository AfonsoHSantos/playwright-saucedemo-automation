import { test, expect } from '../fixtures';

// productInCart é uma fixture de estado que substitui o beforeEach.
// Ela só executa nos testes que a declaram — sem overhead nos demais.

test('exibe o produto adicionado no carrinho', async ({ productInCart, cartPage, page }) => {
  // productInCart já adicionou "Sauce Labs Backpack" e navegou para /cart.html
  await expect(cartPage.cartItems).toHaveCount(1);
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
});

test('remove item do carrinho corretamente', async ({ productInCart, cartPage }) => {
  await cartPage.removeItem('Sauce Labs Backpack');

  // Após remover, o carrinho deve estar vazio
  await expect(cartPage.cartItems).toHaveCount(0);
});

test('navega para o checkout a partir do carrinho', async ({ productInCart, cartPage, page }) => {
  await cartPage.proceedToCheckout();

  await expect(page).toHaveURL(/checkout-step-one/);
});

test('exibe carrinho vazio quando nenhum produto foi adicionado', async ({ cartPage }) => {
  // productInCart NÃO foi solicitada — não executa, sem overhead
  await cartPage.navigate();

  await expect(cartPage.cartItems).toHaveCount(0);
});
