import BasePage from "pages/base.page";
import LoginPage from "pages/login.page";
import ShoppingPage from "pages/shopping.page";

const SELECTORS = {
  BURGER_BUTTON: ".bm-burger-button",
  LOGOUT_LINK: "#logout_sidebar_link",
  SHOPPING_CART: "#shopping_cart_container",
  ITEM_ADD_TO_CART: ".btn_inventory",
  INVENTORY_ITEM: ".inventory_item",
};

class InventoryPage extends BasePage {
  get burgerButton(): WebdriverIO.Element {
    return $(SELECTORS.BURGER_BUTTON);
  }

  get logoutLink(): WebdriverIO.Element {
    return $(SELECTORS.LOGOUT_LINK);
  }

  get itemAddToCartButton() {
    return $$(SELECTORS.ITEM_ADD_TO_CART);
  }

  get shoppingCart(): WebdriverIO.Element {
    return $(SELECTORS.SHOPPING_CART);
  }

  public waitForPageToLoad(): void {
    super.waitForPageToLoad(this.burgerButton);
  }

  public clickBurgerButton(): void {
    this.burgerButton.click();
    browser.pause(500);
  }

  public clickLogoutLink(): void {
    this.logoutLink.click();
    LoginPage.waitForPageToLoad();
  }

  public clickShoppingCart(): void {
    this.shoppingCart.click();
    ShoppingPage.waitForPageToLoad();
  }

  public addALlItems(): void {
    this.itemAddToCartButton.forEach((button: WebdriverIO.Element) => {
      if (button.getText() === "ADD TO CART") {
        button.click();
        browser.pause(500);
      }
    });
  }

  public addFirstItem(): void {
    if (this.itemAddToCartButton[0].getText() === "ADD TO CART") {
      this.itemAddToCartButton[0].click();
      browser.pause(500);
    }
  }
}

export default new InventoryPage();
