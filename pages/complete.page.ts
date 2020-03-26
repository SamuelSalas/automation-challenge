import BasePage from "pages/base.page";

const SELECTORS = {
  COMPLETE_CONTAINER: "#checkout_complete_container",
};

class CompletePage extends BasePage {
  get completeContainer(): WebdriverIO.Element {
    return $(SELECTORS.COMPLETE_CONTAINER);
  }

  public waitForPageToLoad(): void {
    super.waitForPageToLoad(this.completeContainer);
  }
}

export default new CompletePage();
