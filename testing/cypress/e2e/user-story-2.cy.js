/// <reference types="Cypress" />

describe("Show all visits for a vet", () => {

    it("Show visitdata for a vet", () => {
        /*
        cy.visit("localhost:8080");
        cy.contains("Veterinarians").click();
        cy.contains("All").click();

        // get first entry in list
        cy.get("#vets.table").find("tbody").children().first().contains("Show Visits").click();

        // Check AK1: Show per visit {PetName, VisitDate, Description, Owner}
        cy.get("table").find("thead").contains("Pet Name").should("exist");
        cy.get("table").find("thead").contains("Visit Date").should("exist");
        cy.get("table").find("thead").contains("Description").should("exist");
        cy.get("table").find("thead").contains("Owner").should("exist");
        */
    })

    it("Buttons exist in visit list", () => {
        /*
        cy.visit("localhost:8080");
        cy.contains("Veterinarians").click();
        cy.contains("All").click();

        // Get first entry in list
        cy.get("#vets.table").find("tbody").children().first().contains("Show Visits").click();

        // Get only the table rows (except table header)
        cy.get(".table > tr").each(($entry) => {
            // Check if buttons exist by text
            cy.wrap($entry).contains("Edit Visit").should("exist");
            cy.wrap($entry).contains("Delete Visit").should("exist");
            cy.wrap($entry).contains("Show Owner").should("exist");
        })
        */
    })

    it("Delete visit has a confimation", () => {
        /*
        cy.visit("localhost:8080");
        cy.contains("Veterinarians").click();
        cy.contains("All").click();

        // Get first entry in list
        cy.get("#vets.table").find("tbody").children().first().contains("Show Visits").click();

        cy.get(".table > tr").first().contains("Delete Visit").click();
        */
    })

})