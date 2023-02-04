/// <reference types="Cypress" />

describe("Show overarching search bar", () => {
    it("Show bar on all pages", () => {
        cy.visit(Cypress.config("frontendUrl"));
        cy.get('#globalSearch').should("exist");
        cy.contains("Owners").click();
        cy.contains("Search").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("George Franklin").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("Edit Owner").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("Back").click();
        cy.contains("Add New Pet").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("< Back").click();
        cy.contains("Edit Pet").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("Update Pet").click();
        cy.contains("Add Visit").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("Back").click();
        cy.contains("Owners").click();
        cy.contains("Add New").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("Veterinarians").click();
        cy.contains("All").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("Edit Vet").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("< Back").click();
        cy.contains("Show Visits").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("Edit Visit").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("Veterinarians").click();
        cy.get('.open > .dropdown-menu > :nth-child(2) > a').click();
        cy.get('#globalSearch').should("exist");
        cy.contains("Pet Types").click();
        cy.get('#globalSearch').should("exist");
        cy.contains("Specialties").click();
        cy.get('#globalSearch').should("exist");
    })

    it("Show missing input alert", () => {
        cy.visit(Cypress.config("frontendUrl"));
        cy.get('#globalSearch').should("exist");
        cy.get('#SearchButton').should("exist");
        cy.get('#SearchButton').click();
        cy.on('window:alert', (txt) => {
            expect(txt).to.contains('Please enter a term for the search');
        });

    })
    //
    it("Show no results alert", () => {
        cy.visit(Cypress.config("frontendUrl"));
        cy.get('#globalSearch').should("exist");
        cy.get('#SearchButton').should("exist");
        cy.get('#globalSearch').type("zwzwzzzzzzzzzzzzzzzzzzz")
        cy.get('#SearchButton').click();
        cy.get('[id="owner.table"]').contains("No results found")
        cy.get('[id="pet.table"]').contains("No results found")
        cy.get('[id="vet.table"]').contains("No results found")
        cy.get('[id="visit.table"]').contains("No results found")
    })
    //
    // it("Responses have the right fields", () => {
    //     cy.visit(Cypress.config("frontendUrl"));
    //
    // })
    //
    // it("Maximum 10 Results shown", () => {
    //     cy.visit(Cypress.config("frontendUrl"));
    //
    // })
    //
    // it("Cycles by 10 Results", () => {
    //     cy.visit(Cypress.config("frontendUrl"));
    //
    // })

})