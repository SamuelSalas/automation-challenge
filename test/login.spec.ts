import { expect } from "chai";

import { configuration } from "config/index";
import CompletePage from "pages/complete.page";
import InformationPage from "pages/information.page";
import InventoryPage from "pages/inventory.page";
import LoginPage from "pages/login.page";
import OverviewPage from "pages/overview.page";
import ShoppingPage from "pages/shopping.page";
import { firstName, lastName, zip } from "testValue/information.value";
import { cart, checkoutComplete, checkoutStepTwo, index, inventory } from "testValue/urls.value";

describe("Login", () => {
  const baseUrl: string = configuration.baseUrl !== undefined ? configuration.baseUrl : "";
  const username: string = configuration.username !== undefined ? configuration.username : "";
  const password: string = configuration.password !== undefined ? configuration.password : "";

  beforeEach(() => {
    LoginPage.open();
  });

  it("Should login with a valid user", () => {
    LoginPage.setUsernameInputValue(username);
    expect(LoginPage.getUsernameInputValue()).to.equal(username);

    LoginPage.setPasswordInputValue(password);
    expect(LoginPage.getPasswordInputValue()).to.equal(password);

    LoginPage.clickSubmitButton();
    expect(LoginPage.getUrl()).to.equal(`${baseUrl}${inventory}`);
  });

  it("Should not login with an invalid user", () => {
    LoginPage.setUsernameInputValue(username);
    expect(LoginPage.getUsernameInputValue()).to.equal(username);

    LoginPage.setPasswordInputValue(zip);
    expect(LoginPage.getPasswordInputValue()).to.equal(zip);

    LoginPage.clickSubmitButton();
    expect(LoginPage.isErrorMessageDisplayed()).to.be.true;
  });

  describe("Inventory page", () => {
    beforeEach(() => {
      LoginPage.setUsernameInputValue(username);
      LoginPage.setPasswordInputValue(password);
      LoginPage.clickSubmitButton();
      InventoryPage.waitForPageToLoad();
    });

    it("Should logout from product's page", () => {
      InventoryPage.clickBurgerButton();
      InventoryPage.clickLogoutLink();
      expect(LoginPage.getUrl()).to.equal(`${baseUrl}${index}`);
    });

    it("Should navigate to shopping cart page", () => {
      InventoryPage.clickShoppingCart();
      expect(ShoppingPage.getUrl()).to.equal(`${baseUrl}${cart}`);
    });

    it("Should add a single item to shopping cart", () => {
      const itemName = InventoryPage.getFirstItemName();
      InventoryPage.addFirstItem();
      InventoryPage.clickShoppingCart();

      expect(ShoppingPage.getFirstItemName()).to.equal(itemName);
    });

    it("Should add a multiple items to shopping cart", () => {
      const itemsName = InventoryPage.getItemsNames();
      InventoryPage.addALlItems();
      InventoryPage.clickShoppingCart();

      expect(ShoppingPage.getItemsNames()).to.have.members(itemsName);
    });

    describe("Checkout Step One", () => {
      let selectedItems: string[];
      beforeEach(() => {
        InventoryPage.addALlItems();
        InventoryPage.clickShoppingCart();

        selectedItems = ShoppingPage.getItemsNames();
        ShoppingPage.clickCheckoutButton();
      });

      it("Should no continue with missing information", () => {
        InformationPage.clickContinueButton();
        expect(InformationPage.isErrorMessageDisplayed()).to.be.true;
      });

      it("Should fill user's information", () => {
        InformationPage.setFirstNameInputValue(firstName);
        expect(InformationPage.getFirstNameInputValue()).to.equal(firstName);

        InformationPage.setLastNameInputValue(lastName);
        expect(InformationPage.getLastNameInputValue()).to.equal(lastName);

        InformationPage.setZipInputValue(zip);
        expect(InformationPage.getZipInputValue()).to.equal(zip);

        InformationPage.clickContinueButton();
        OverviewPage.waitForPageToLoad();
        expect(OverviewPage.getUrl()).to.equal(`${baseUrl}${checkoutStepTwo}`);
      });

      describe("Checkout Step Two", () => {
        beforeEach(() => {
          InformationPage.setFirstNameInputValue("Samuel");
          InformationPage.setLastNameInputValue("Salas");
          InformationPage.setZipInputValue("00810");
          InformationPage.clickContinueButton();
          OverviewPage.waitForPageToLoad();
        });

        it("Should validate items match the added items", () => {
          expect(OverviewPage.getItemsNames()).to.have.members(selectedItems);
        });

        it("Should complete the purchase", () => {
          OverviewPage.clickFinishButton();
          expect(CompletePage.getUrl()).to.equal(`${baseUrl}${checkoutComplete}`);
        });
      });
    });
  });
});
