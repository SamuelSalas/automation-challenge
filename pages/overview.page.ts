import BasePage from "pages/base.page";
import CompletePage from "pages/complete.page";

const SELECTORS = {
  CART_LIST: ".cart_list",
  FINISH_BUTTON: ".cart_button",
};

class OverviewPage extends BasePage {
  get cartList(): WebdriverIO.Element {
    return $(SELECTORS.CART_LIST);
  }

  get finishButton(): WebdriverIO.Element {
    return $(SELECTORS.FINISH_BUTTON);
  }

  public waitForPageToLoad(): void {
    super.waitForPageToLoad(this.cartList);
  }

  public clickFinishButton(): void {
    this.finishButton.click();
    CompletePage.waitForPageToLoad();
  }
}

export default new OverviewPage();
