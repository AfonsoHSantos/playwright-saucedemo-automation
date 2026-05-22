import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Este arquivo testa o fluxo de login — não usa storageState,
// pois o próprio fluxo de autenticação é o que está sendo validado.
const test = base.extend<{ loginPage: LoginPage; inventoryPage: InventoryPage }>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

test('redireciona para o inventário após login válido', async ({ loginPage, inventoryPage, page }) => {
  // Arrange
  await loginPage.navigate();

  // Act
  await loginPage.login('standard_user', 'secret_sauce');

  // Assert — asserção web-first: aguarda e reavalia automaticamente
  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.title).toHaveText('Products');
});

test('exibe erro ao usar credenciais inválidas', async ({ loginPage }) => {
  await loginPage.navigate();

  await loginPage.login('usuario_invalido', 'senha_errada');

  // O POM não valida — o teste decide o que é sucesso ou falha
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Username and password do not match');
});

test('exibe erro ao deixar usuário em branco', async ({ loginPage }) => {
  await loginPage.navigate();

  await loginPage.login('', 'secret_sauce');

  await expect(loginPage.errorMessage).toContainText('Username is required');
});

test('exibe erro ao deixar senha em branco', async ({ loginPage }) => {
  await loginPage.navigate();

  await loginPage.login('standard_user', '');

  await expect(loginPage.errorMessage).toContainText('Password is required');
});

// Data-driven: evita duplicar testes similares para cada tipo de usuário
const usuarios = [
  { username: 'standard_user',          descricao: 'usuário padrão' },
  { username: 'performance_glitch_user', descricao: 'usuário com glitch de performance' },
  { username: 'problem_user',            descricao: 'usuário com problemas' },
];

for (const { username, descricao } of usuarios) {
  test(`redireciona para o inventário com ${descricao}`, async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(username, 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });
}
