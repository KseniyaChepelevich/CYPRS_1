// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.contains('Log in').click();
    cy.get('#mail').type(email);
    cy.get('#pass').type(password);
    cy.contains('Submit').click();

});

Cypress.Commands.add('typeForm', (title, description, authors) => {
    cy.contains("Add new").click();
    cy.contains("Book description");
    cy.get("#title").type(title);
    cy.get("#description").type(description);
    //cy.get("#fileCover").attachFile(fileCover);
    //cy.get("#fileBook").attachFile(fileBook);
    cy.get("#authors").type(authors);
    // cy.contains("Submit").click();

});



import 'cypress-file-upload';