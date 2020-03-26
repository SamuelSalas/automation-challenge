import BasePage from "pages/base.page";
import InformationPage from "pages/information.page";

const SELECTORS = {
  CHECKOUT_BUTTON: ".checkout_button",
};

class ShoppingPage extends BasePage {
  get checkoutButton(): WebdriverIO.Element {
    return $(SELECTORS.CHECKOUT_BUTTON);
  }

  public waitForPageToLoad(): void {
    super.waitForPageToLoad(this.checkoutButton);
  }

  public clickCheckoutButton(): void {
    this.checkoutButton.click();
    InformationPage.waitForPageToLoad();
  }
}

export default new ShoppingPage();
