import { test, expect } from '../fixtures';

// Padrão AAA: Arrange (fixtures), Act (métodos POM), Assert (expect web-first)

test('finaliza a compra com sucesso', async ({ productInCart, cartPage, checkoutPage, page }) => {
  // Arrange — productInCart já preparou o carrinho com um produto
  await cartPage.proceedToCheckout();

  // Act — ações encapsuladas no POM, sem seletores soltos no teste
  await checkoutPage.fillPersonalInfo('John', 'Doe', '12345');
  await checkoutPage.continue();
  await checkoutPage.finish();

  // Assert — asserção web-first: aguarda a renderização sem waitForTimeout
  await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
  await expect(page).toHaveURL(/checkout-complete/);
});

test('exibe erro ao avançar sem preencher o nome', async ({ productInCart, cartPage, checkoutPage }) => {
  await cartPage.proceedToCheckout();

  // Tenta avançar sem preencher nenhum campo
  await checkoutPage.continue();

  // O POM não valida — o teste decide o que é sucesso ou falha
  await expect(checkoutPage.errorMessage).toContainText('First Name is required');
});

test('exibe erro ao avançar sem preencher o sobrenome', async ({ productInCart, cartPage, checkoutPage }) => {
  await cartPage.proceedToCheckout();

  await checkoutPage.fillPersonalInfo('John', '', '12345');
  await checkoutPage.continue();

  await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
});

test('exibe erro ao avançar sem preencher o CEP', async ({ productInCart, cartPage, checkoutPage }) => {
  await cartPage.proceedToCheckout();

  await checkoutPage.fillPersonalInfo('John', 'Doe', '');
  await checkoutPage.continue();

  await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
});

test('exibe o resumo do pedido antes de finalizar', async ({ productInCart, cartPage, checkoutPage, page }) => {
  await cartPage.proceedToCheckout();
  await checkoutPage.fillPersonalInfo('John', 'Doe', '12345');
  await checkoutPage.continue();

  // Valida que está na página de resumo antes de finalizar
  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
});
