import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { LoginPage } from '../pages/LoginPage';

// Roda uma única vez antes de toda a suíte.
// Salva cookies e localStorage para que os testes comecem já autenticados,
// sem precisar repetir o fluxo de login em cada arquivo.
setup('autenticar usuário', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // Garante que o login foi bem-sucedido antes de salvar a sessão
  await expect(page).toHaveURL(/inventory/);

  const authDir = path.join(process.cwd(), '.auth');
  fs.mkdirSync(authDir, { recursive: true });
  await page.context().storageState({ path: path.join(authDir, 'user.json') });
});