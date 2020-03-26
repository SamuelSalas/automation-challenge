const SELECTORS = {
  INVENTORY_ITEM_NAME: ".inventory_item_name",
  ERROR_MESSAGE: "[data-test='error']",
};

export default class BasePage {
  get errorMessage(): WebdriverIO.Element {
    return $(SELECTORS.ERROR_MESSAGE);
  }

  get itemsNames(): WebdriverIO.Element[] {
    return $$(SELECTORS.INVENTORY_ITEM_NAME);
  }

  public open(path: string) {
    browser.url(path);
  }

  public waitForPageToLoad(selector: WebdriverIO.Element) {
    if (!selector.isDisplayed()) {
      selector.waitForDisplayed(200000);
    }
  }

  public getUrl(): string {
    return browser.getUrl();
  }

  public getItemsNames(): string[] {
    return this.itemsNames.map((name: WebdriverIO.Element) => name.getText());
  }

  public getFirstItemName(): string {
    return this.itemsNames[0].getText();
  }

  public isErrorMessageDisplayed(): boolean {
    return this.errorMessage.isDisplayed();
  }
}
