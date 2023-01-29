/// <reference types="Cypress" />

describe('Delete an Owner', () => {
  beforeEach(() => {
    cy.visit('localhost:8080');
    // navigate to owners list
    cy.contains('Owners').click();
    cy.contains('Search').click();
  })

  it('Check if Delete Button exists', () => {
    // press the first entry in the list
    cy.get('#ownersTable').find('tbody').children().first().children().first().children().first().click();
    cy.contains('Edit Owner').click();

    cy.contains('Delete Owner').should('exist');
  })

  it('Check if security check message exists', () => {
    // press the first entry in the list
    cy.get('#ownersTable').find('tbody').children().first().children().first().children().first().click();
    cy.contains('Edit Owner').click();

    cy.contains('Delete Owner').click();
    
    // Accessing the pop-up
    cy.on('window:confirm', (txt) => {
      expect(txt).to.contains('Are you sure you want to delete this owner and all his associated pets and visits?');
    });

    // Needed since cypress will press ok otherwise and delete the owner
    cy.on('window:confirm', () => false);
  })

  it('Cancel deletion of an owner', () => {
    cy.addNewOwner('Paul', 'Pausten', '131 Paul-Klee-Strasse', 'Bremen', '98427123');

    // Reload page to refresh frontend
    cy.visit('localhost:8080');
    // navigate to owners list
    cy.contains('Owners').click();
    cy.contains('Search').click();

    cy.contains('Paul Pausten').click();

    cy.contains('Edit Owner').click();

    cy.contains('Delete Owner').click();
    // Accessing the pop-up
    cy.on('window:confirm', (txt) => {
      expect(txt).to.contains('Are you sure you want to delete this owner and all his associated pets and visits?');
    });

    // Needed since cypress will press ok otherwise and delete the owner
    cy.on('window:confirm', () => false);

    // User is redirected to show details page
    cy.url().should('contain', 'petclinic/owners/' );

    // Navigate back to list of all owners
    cy.contains('Back').click();

    // Check if not deleted owner does still exist
    cy.contains('Paul Pausten').should('exist');
  })

  /* This testcase suffices since the requirement only specified to delete an owner.
  Since we should not debug or test already implemented functions - and we use the
  standard 'deleteOwner' API function here - we don't need to test if the pets and/or
  visits are correctly deleted as well*/
  it('Delete a new Owner with no pets or visits', () => {
    cy.addNewOwner('Bob', 'Tester', '12 Teststrasse', 'Testhausen', '947120397');

    // Reload page to refresh frontend
    cy.visit('localhost:8080');
    // navigate to owners list
    cy.contains('Owners').click();
    cy.contains('Search').click();

    cy.contains('Bob Tester').click();
    cy.contains('Edit Owner').click();

    cy.contains('Delete Owner').click();
    
    // no further action needed since cypress confirms confirm-popups by default

    // User gets thrown back to landing page
    cy.url().should('equal', 'http://localhost:8080/petclinic/owners');

    // Check if owner is not shown in owner search list "he is deleted"
    // navigate to owners list
    cy.contains('Owners').click();
    cy.contains('Search').click();
    cy.contains('Bob Tester').should('not.exist');
  })
})