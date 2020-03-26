import BasePage from "pages/base.page";

const SELECTORS = {
  USERNAME_INPUT: "#user-name",
  PASSWORD_INPUT: "#password",
  SUBMIT_BUTTON: "[type='submit']",
};

class LoginPage extends BasePage {
  get usernameInput(): WebdriverIO.Element {
    return $(SELECTORS.USERNAME_INPUT);
  }

  get passwordInput(): WebdriverIO.Element {
    return $(SELECTORS.PASSWORD_INPUT);
  }

  get submitButton(): WebdriverIO.Element {
    return $(SELECTORS.SUBMIT_BUTTON);
  }

  public waitForPageToLoad(): void {
    super.waitForPageToLoad(this.usernameInput);
  }

  public open(): void {
    super.open("index.html");
    this.waitForPageToLoad();
  }

  public setUsernameInputValue(username: string): void {
    this.usernameInput.setValue(username);
    browser.pause(500);
  }

  public getUsernameInputValue(): string {
    return this.usernameInput.getValue();
  }

  public setPasswordInputValue(password: string): void {
    this.passwordInput.setValue(password);
    browser.pause(500);
  }

  public getPasswordInputValue(): string {
    return this.passwordInput.getValue();
  }

  public clickSubmitButton(): void {
    this.submitButton.click();
    browser.pause(500);
  }
}

export default new LoginPage();
