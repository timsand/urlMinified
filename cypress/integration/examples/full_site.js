describe('Basic functionality test', () => {
  it('should be able to successfully get a valid URL if the input is valid', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').type('https://www.youtube.com/watch?v=7N63cMKosIE');
    cy.get('input').type('{enter}');
    cy.wait(500);
    cy.get("#RebrandedContainer").should('be.visible');
    cy.get("#RebrandedContainer").find('a');
    //clicking away causes cypress errors as its a page redirect
  })
  it('should fail when given wrong information', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').type('wrongwrong');
    cy.get('input').type('{enter}');
    cy.wait(500);
    cy.get("#appErrorMessage").should("be.visible");
  })
  it('should loop back to the home page when the user wants to submit again', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').type('https://www.youtube.com/watch?v=7N63cMKosIE');
    cy.get('input').type('{enter}');
    cy.wait(500);
    cy.get("#RebrandedContainer").should('be.visible');
    cy.get("#RebrandedContainer").find('a');
    cy.get("#RebrandedHomeButton").click();
    cy.wait(300);
    cy.get('input').should('be.visible');
  })
  it('should clear the error message after a successful loopback', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').type('badbad');
    cy.get('input').type('{enter}');
    cy.get("#appErrorMessage").should("be.visible");
    cy.get('input').clear();
    cy.get('input').type('https://www.youtube.com/watch?v=7N63cMKosIE');
    cy.get('input').type('{enter}');
    cy.wait(500);
    cy.get("#RebrandedContainer").should('be.visible');
    cy.get("#RebrandedContainer").find('a');
    cy.get("#RebrandedHomeButton").click();
    cy.wait(300);
    cy.get('input').should('be.visible');
  })
})