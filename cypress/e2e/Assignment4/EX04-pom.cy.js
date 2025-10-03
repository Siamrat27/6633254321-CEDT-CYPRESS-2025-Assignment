const { LoginPage } = require("../../page-objects/LoginPage");
const { HomePage } = require("../../page-objects/HomePage");

describe("Assignment 4: Page Object Model - Zero Bank Login", () => {
  const loginPage = new LoginPage();
  const homePage = new HomePage();

  context("Valid Login", () => {
    beforeEach(() => {
      loginPage.visit();
    });

    it("should login with valid credentials", () => {
      const user = Cypress.env("USER");
      const pwd = Cypress.env("PWD");

      loginPage.login(user, pwd);
      homePage.shouldBeLoggedIn();
    });
  });

  context("Invalid Login", () => {
    beforeEach(() => {
      loginPage.visit();
    });

    it("should show error with invalid credentials", () => {
      loginPage.login("wrong_user", "wrong_pass");
      loginPage.errorShouldBeVisible();
    });
  });
});
