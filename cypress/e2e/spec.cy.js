/* eslint-disable no-undef */
describe("template spec", () => {
   it("passes", () => {
      cy.visit("http://localhost:8888/");
      const signInBtn = cy.findByRole("button", { name: /Sign In/i });
      const emailAddress = cy.findByRole("textbox", { name: /email/i });
      cy.findByTestId("password");
      cy.findByText("Sign in", { selector: "h1" });
      cy.findByTestId("signInBackgroundImage");
      const rememberMeCheckbox = cy.findByLabelText("Remember me");
      cy.findByRole("link", {
         name: "Forgot password?",
      });
      cy.findByRole("link", {
         name: "Don't have an account? Sign Up",
      });
      cy.findByRole("link", {
         name: "Your Website",
      });
      rememberMeCheckbox.should("not.be.checked");
      emailAddress.should("be.visible");
      signInBtn.click();
   });
});
