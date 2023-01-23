/// <reference types="Cypress" />

describe('Show all visits for a vet', () => {

    it('Show all visits for a vet', () => {
        cy.visit('localhost:8080');
        cy.contains('Veterinarians').click();
        cy.contains('All').click();

        // Cypress automatically uses the first found entry in the given list
        cy.log(cy.get('tbody').children());
        // cy.contains('Show Visits').click();

        // TODO Somehow check if max of 10 entries are shown

    })

})