import { Page, Locator } from '@playwright/test';

// Encapsula o fluxo de checkout (step one e step two)
export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationHeader: Locator;
  readonly errorMessage: Locator;

  constructor(private page: Page) {
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationHeader = page.locator('[data-test="complete-header"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Preenche as informações pessoais necessárias para o checkout
   * @param firstName - Primeiro nome do usuário (ex: 'João')
   * @param lastName - Sobrenome do usuário (ex: 'Silva')  
   * @param postalCode - Código postal/CEP (ex: '12345', '01234-567')
   * @example
   * await checkoutPage.fillPersonalInfo('João', 'Silva', '12345');
   */
  async fillPersonalInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}
