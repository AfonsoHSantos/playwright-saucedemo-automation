import { test, expect } from '../fixtures';

// Todos os testes deste arquivo começam já autenticados via storageState.
// Não há nenhum beforeEach de login — a sessão é reutilizada automaticamente.

test('exibe a página de produtos após autenticação', async ({ inventoryPage }) => {
  await inventoryPage.navigate();

  // Asserção web-first: aguarda renderização sem nenhum waitForTimeout
  await expect(inventoryPage.title).toHaveText('Products');
});

test('adiciona produto ao carrinho e atualiza o badge', async ({ inventoryPage }) => {
  await inventoryPage.navigate();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');

  // Badge deve mostrar "1" após adicionar um produto
  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('remove produto do carrinho e oculta o badge', async ({ inventoryPage }) => {
  await inventoryPage.navigate();

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.removeProductFromCart('Sauce Labs Backpack');

  // Badge não deve mais estar visível após remover o único item
  await expect(inventoryPage.cartBadge).not.toBeVisible();
});

test('ordena produtos de A a Z por padrão', async ({ inventoryPage }) => {
  await inventoryPage.navigate();

  // Sauce Labs Backpack é o primeiro e Test.allTheThings() T-Shirt (Red) é o último em ordem alfabética
  await expect(inventoryPage.productNames.first()).toHaveText('Sauce Labs Backpack');
  await expect(inventoryPage.productNames.last()).toHaveText('Test.allTheThings() T-Shirt (Red)');
});

test('ordena produtos por preço do menor para o maior', async ({ inventoryPage }) => {
  await inventoryPage.navigate();
  await inventoryPage.sortBy('lohi');

  // O item mais barato deve ser o primeiro
  await expect(inventoryPage.productPrices.first()).toHaveText('$7.99');
});
