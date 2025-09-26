describe("EX03: Then - Alias - Fixture", () => {
  beforeEach(() => {
    cy.fixture("user.json").as("users");
  });

  it("Login success with fixture data + alias for header", function () {
    cy.login(this.users.valid.username, this.users.valid.password);

    cy.get("h2").as("header");
    cy.get("@header").should("have.text", "Make Appointment");

    cy.get("@header").then(($h2) => {
      const txt = $h2.text();
      expect(txt).to.eq("Make Appointment");
    });
  });

  it("Fill appointment form using fixture + alias", function () {
    cy.login(this.users.valid.username, this.users.valid.password);

    cy.get("#combo_facility").as("facility");
    cy.get("@facility")
      .select("Hongkong CURA Healthcare Center")
      .find("option:selected")
      .should("have.text", "Hongkong CURA Healthcare Center");

    cy.get("#chk_hospotal_readmission").check().should("be.checked");
    cy.get("#radio_program_medicaid").check().should("be.checked");

    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const today = `${dd}/${mm}/${yyyy}`;

    cy.get("#txt_visit_date").clear().type(today).should("have.value", today);

    cy.get("body").click(0, 0);

    cy.get("#txt_comment")
      .clear()
      .type(this.users.comment)
      .should("have.value", this.users.comment);

    cy.get("#btn-book-appointment").should("be.visible").and("not.be.disabled");
  });

  it("Login fail cases with fixture", function () {
    cy.login(
      this.users.invalidPassword.username,
      this.users.invalidPassword.password
    );
    cy.get(".text-danger").should("contain", "Login failed!");

    cy.login(
      this.users.invalidUsername.username,
      this.users.invalidUsername.password
    );
    cy.get(".text-danger").should("contain", "Login failed!");
  });
});
