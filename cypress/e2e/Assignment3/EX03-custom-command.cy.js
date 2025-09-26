describe("EX03: Custom Command - reuse login", () => {
  const VALID_USER = { username: "John Doe", password: "ThisIsNotAPassword" };

  it("Login success with valid user (via custom command)", () => {
    cy.login(VALID_USER.username, VALID_USER.password);
    cy.get("h2").should("have.text", "Make Appointment");
  });

  it("Login fail with invalid password", () => {
    cy.login(VALID_USER.username, "WrongPassword123!");
    cy.get(".text-danger").should("contain", "Login failed!");
  });

  it("Login fail with invalid username", () => {
    cy.login("John Wick", VALID_USER.password);
    cy.get(".text-danger").should("contain", "Login failed!");
  });
});
