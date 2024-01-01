// // cypress/integration/your_test_spec.js
// describe('Dashboard', () => {
//     before(() => {
//       cy.signInDashboard('/dashboard'); // Replace with the actual dashboard path
//     });
//     it('should have the expected behavior', () => {
//       // Your test assertions and actions go here
//       // For example:
//       // cy.get('.dashboard-title').should('contain', 'Welcome to the Dashboard');
//     });
//   });

describe('The Home Page', () => {
    it('successfully loads', () => {
      cy.visit('/')
    })
    // it('does something on a secured page', function () {
    //     const { username, password } = this.currentUser
    //     cy.login(username, password)
    // In your spec file (e.g., cypress/integration/your_test_spec.js)

it('does something on a secured page', function () {
    const username = 'mdjasimrchowdhury@gmail.com';
    const password = '123456';
  
    // Use the cy.login command with the specific username and password
    cy.login(username, password);
    cy.get("[data-test='hero-heading']").contains("Welcome to the Home Horizon App, an easy-to-use mobile-friendly solution to homeless shelter data-collection needs. View, edit and add new service user's information in just a few clicks.")
    cy.get("[data-test='hero-heading']").contains("We believe homeless shelter staff like you deserve the best technology to help them provide the amazing service our communities need. We hope you'll find this useful.")
    cy.get("[data-test='hero-heading']").contains("View or Edit Database").click()
    //cy.get("[data-test='back-button']").click()
    cy.get("[data-test='add-user']").contains("Add New User").click()
    //cy.get("[data-test='back-button']").click()
    cy.get("[data-test='referral']").contains("Referral Links").click()
    cy.get("[data-test='back-button']").click()
    cy.get("[data-test='signout']").contains("Sign Out").click()

  
    // Now you are logged in, and you can perform the rest of your test
    // For example, interact with elements on the secured page
    // cy.get('.some-element').click();
  
    // ...rest of your test
  });
  
    })