const monthsEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ฟังก์ชันกดวันที่จากปฏิทิน
function pickDate(dateStr) {
  const [ddStr, mmStr, yyyyStr] = dateStr.split("/");
  const dd = parseInt(ddStr, 10);
  const mm = parseInt(mmStr, 10);
  const yyyy = parseInt(yyyyStr, 10);
  const targetLabel = `${monthsEn[mm - 1]} ${yyyy}`;

  cy.get("#txt_visit_date").click();
  cy.get(".datepicker", { timeout: 10000 }).should("be.visible");

  // เลื่อนไปเดือนปีที่ต้องการ
  const moveToMonthYear = () => {
    return cy.get(".datepicker-days .datepicker-switch").then(($sw) => {
      const cur = $sw.text().trim();
      if (cur === targetLabel) return;

      const [curMonthName, curYearStr] = cur.split(" ");
      const curMonth = monthsEn.indexOf(curMonthName) + 1;
      const curYear = parseInt(curYearStr, 10);

      if (curYear < yyyy || (curYear === yyyy && curMonth < mm)) {
        cy.get(".datepicker-days .next").click();
      } else {
        cy.get(".datepicker-days .prev").click();
      }
      return moveToMonthYear();
    });
  };

  moveToMonthYear().then(() => {
    cy.get(".datepicker-days .day:not(.old):not(.new)")
      .contains(new RegExp(`^${dd}$`))
      .click();

    cy.get("#txt_visit_date").should("have.value", dateStr);

    cy.get("body").click(0, 0);
    cy.get(".datepicker").should("not.exist");
  });
}

describe("EX02: Assert web elements (single-flow with calendar click)", () => {
  it("Login once then assert all elements on Make Appointment page", () => {
    const URL = "https://katalon-demo-cura.herokuapp.com/";
    const VALID_USER = { username: "John Doe", password: "ThisIsNotAPassword" };

    // 1) Visit & go to Login
    cy.visit(URL);
    cy.get("#btn-make-appointment", { timeout: 10000 })
      .should("be.visible")
      .click();

    // 2) Login
    cy.get("#txt-username").type(VALID_USER.username);
    cy.get("#txt-password").type(VALID_USER.password, { log: false });
    cy.get("#btn-login").click();

    // 3) หน้า Make Appointment
    cy.url({ timeout: 10000 }).should("include", "#appointment");
    cy.get("#appointment h2", { timeout: 10000 }).should(
      "have.text",
      "Make Appointment"
    );

    // 4) Facility
    const facilities = [
      "Tokyo CURA Healthcare Center",
      "Hongkong CURA Healthcare Center",
      "Seoul CURA Healthcare Center",
    ];
    cy.get("#combo_facility", { timeout: 10000 }).should("be.visible");
    facilities.forEach((f) => {
      cy.get("#combo_facility").select(f);
      cy.get("#combo_facility").find("option:selected").should("have.text", f);
    });

    // 5) Checkbox
    cy.get("#chk_hospotal_readmission").as("readmission");
    cy.get("@readmission").check().should("be.checked");
    cy.get("@readmission").uncheck().should("not.be.checked");
    cy.get("@readmission").check().should("be.checked");

    // 6) Radio
    cy.get("#radio_program_medicaid").check().should("be.checked");
    cy.get("#radio_program_medicare").check().should("be.checked");
    cy.get("#radio_program_none").check().should("be.checked");

    // 7) เลือกวันที่วันนี้จากปฏิทิน
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yyyy = now.getFullYear();
    const today = `${dd}/${mm}/${yyyy}`;
    pickDate(today);

    // 8) Comment
    cy.get("#txt_comment")
      .clear()
      .type("Test comment")
      .should("have.value", "Test comment");

    // 9) Book button
    cy.get("#btn-book-appointment").should("be.visible").and("not.be.disabled");

    // 10) กดปุ่มและ assert ว่าไปหน้า Confirmation
    cy.get("#btn-book-appointment").click();
    cy.contains("h2", "Appointment Confirmation", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});
