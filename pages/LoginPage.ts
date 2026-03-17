import { Page, Locator } from '@playwright/test';

// Encapsula seletores e ações da página de login.
// Qualquer mudança de seletor é corrigida aqui — não nos testes.
export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    // SauceDemo usa data-test — contrato estável entre QA e Dev
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  /**
   * Realiza o processo de login na aplicação
   * @param username - Nome de usuário para autenticação (ex: 'standard_user', 'locked_out_user')
   * @param password - Senha para autenticação (geralmente 'secret_sauce')
   * @example
   * await loginPage.login('standard_user', 'secret_sauce');
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
