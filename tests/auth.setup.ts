import { test as setup, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Roda uma única vez antes de toda a suíte.
// Salva cookies e localStorage para que os testes comecem já autenticados,
// sem precisar repetir o fluxo de login em cada arquivo.
setup('autenticar usuário', async ({ page }) => {
  await page.goto('/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Garante que o login foi bem-sucedido antes de salvar a sessão
  await expect(page).toHaveURL(/inventory/);

  const authDir = path.join(process.cwd(), '.auth');
  fs.mkdirSync(authDir, { recursive: true });
  await page.context().storageState({ path: path.join(authDir, 'user.json') });
});