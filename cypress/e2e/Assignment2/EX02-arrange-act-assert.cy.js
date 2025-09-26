describe("EX02: Arrange-Act-Assert - Login", () => {
  const URL = "https://katalon-demo-cura.herokuapp.com/";
  const VALID_USER = { username: "John Doe", password: "ThisIsNotAPassword" };

  beforeEach(() => {
    cy.visit(URL);
    cy.get("#btn-make-appointment", { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.url().should("include", "/profile.php");
  });

  it("Verify login pass with valid user", () => {
    cy.get("#txt-username").as("user");
    cy.get("#txt-password").as("pass");

    cy.get("@user").type(VALID_USER.username);
    cy.get("@pass").type(VALID_USER.password, { log: false });
    cy.get("#btn-login").click();

    cy.get("h2", { timeout: 10000 }).should("have.text", "Make Appointment");
    cy.url().should("match", /appointment|#appointment/i);
  });

  it("Verify login fail with invalid password", () => {
    cy.get("#txt-username").type(VALID_USER.username);
    cy.get("#txt-password").type("WrongPassword123!", { log: false });
    cy.get("#btn-login").click();

    cy.get(".text-danger").should("be.visible").and("contain", "Login failed!");
  });

  it("Verify login fail with invalid username", () => {
    cy.get("#txt-username").type("John Wick");
    cy.get("#txt-password").type(VALID_USER.password, { log: false });
    cy.get("#btn-login").click();

    cy.get(".text-danger").should("be.visible").and("contain", "Login failed!");
  });
});
