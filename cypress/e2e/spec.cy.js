/// <reference types="Cypress" />

describe('Delete an Owner', () => {
  beforeEach(() => {
    cy.visit('localhost:8080');
    // navigate to owners list
    cy.get(':nth-child(2) > .dropdown-toggle').click();
    cy.get('.open > .dropdown-menu > :nth-child(1) > a').click();
  })

  it('Check if Delete Button exists', () => {
    // press the first entry in the list
    cy.get(':nth-child(1) > .ownerFullName > a').click();
    cy.contains('Edit Owner').click();

    cy.contains('Delete Owner');
  })

  it('Check if security check message exists', () => {
    // press the first entry in the list
    cy.get(':nth-child(1) > .ownerFullName > a').click();
    cy.contains('Edit Owner').click();

    cy.contains('Delete Owner').click();
    cy.contains('Are you sure you want to delete this owner and all his associated pets and visits?');
    cy.contains('Submit Deletion');
    cy.contains('Cancel');
  })

  it('Cancel deletion of an owner', () => {
    // press the first entry in the list
    cy.get(':nth-child(1) > .ownerFullName > a').click();

    // Save Owner Details for check query later on
    var fullName = cy.get('.ownerFullName');
    var address = cy.get(':nth-child(2) > td');
    var city = cy.get(':nth-child(3) > td');
    var telephone = cy.get(':nth-child(4) > td');

    cy.contains('Edit Owner').click();
    var editURL = cy.url();

    cy.contains('Delete Owner').click();
    cy.contains('Cancel').click();

    // User is still on edit page
    cy.url().should('equal', editURL);

    cy.contains('Back').click();
    cy.contains('Back').click();

    // Not deleted owner does still exist
    cy.contains(fullName);
    cy.contains(address);
    cy.contains(city);
    cy.contains(telephone);
  })

  /* This testcase suffices since the requirement only specified to delete an owner.
  Since we should not debug or test already implemented functions - and we use the
  standard 'deleteOwner' API function here - we don't need to test if the pets and/or
  visits are correctly deleted as well*/
  it('Delete a new Owner with no pets or visits', () => {
    addNewOwner();
    cy.contains('Bob Tester').click();
    cy.contains('Edit Owner').click();

    cy.contains('Delete Owner').click();
    
    cy.contains('Are you sure you want to delete this owner and all his associated pets and visits?');
    
    cy.contains('Submit Deletion').click();

    cy.contains('Success');

    // User gets thrown back to landing page
    cy.url().should('include', '/petclinic/welcome');

    // Check if owner is not shown in owner search list
    // navigate to owners list
    cy.get(':nth-child(2) > .dropdown-toggle').click();
    cy.get('.open > .dropdown-menu > :nth-child(1) > a').click();
  })
})

function addNewOwner() {
  cy.get('#ownersTable > div > .btn').click();
  cy.get('#firstName').type('Bob');
  cy.get('#lastName').type('Tester');
  cy.get('#address').type('Teststrasse 13');
  cy.get('#city').type('Testhausen');
  cy.get('#telephone').type('123456789');
  cy.get('[type="submit"]').click();
}