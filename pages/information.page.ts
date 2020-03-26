import BasePage from "pages/base.page";

const SELECTORS = {
  FIRST_NAME_INPUT: "#first-name",
  LAST_NAME_INPUT: "#last-name",
  ZIP_INPUT: "#postal-code",
  CONTINUE_BUTTON: ".cart_button",
};

class InformationPage extends BasePage {
  get firstNameInput(): WebdriverIO.Element {
    return $(SELECTORS.FIRST_NAME_INPUT);
  }

  get lastNameInput(): WebdriverIO.Element {
    return $(SELECTORS.LAST_NAME_INPUT);
  }

  get zipInput(): WebdriverIO.Element {
    return $(SELECTORS.ZIP_INPUT);
  }

  get continueButton(): WebdriverIO.Element {
    return $(SELECTORS.CONTINUE_BUTTON);
  }

  public waitForPageToLoad(): void {
    super.waitForPageToLoad(this.continueButton);
  }

  public setFirstNameInputValue(name: string): void {
    this.firstNameInput.setValue(name);
    browser.pause(500);
  }

  public getFirstNameInputValue(): string {
    return this.firstNameInput.getValue();
  }

  public setLastNameInputValue(name: string): void {
    this.lastNameInput.setValue(name);
    browser.pause(500);
  }

  public getLastNameInputValue(): string {
    return this.lastNameInput.getValue();
  }

  public setZipInputValue(zip: string): void {
    this.zipInput.setValue(zip);
    browser.pause(500);
  }

  public getZipInputValue(): string {
    return this.zipInput.getValue();
  }

  public clickContinueButton(): void {
    this.continueButton.click();
    browser.pause(500);
  }
}

export default new InformationPage();
