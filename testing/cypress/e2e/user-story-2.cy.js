/// <reference types="Cypress" />

describe("Show all visits for a vet", () => {
/*
    it("Show visitdata for a vet", () => {
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
    })

    it("Buttons exist in visit list", () => {
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
    })

    it("Delete visit has a confirmation", () => {
        cy.visit("localhost:8080");
        cy.contains("Veterinarians").click();
        cy.contains("All").click();

        // Get first entry in list
        cy.get("#vets.table").find("tbody").children().first().contains("Show Visits").click();

        cy.get(".table > tr").first().contains("Delete Visit").click();

        // Check for confirmation alert-window
        cy.on("window:confirm", (txt) => {
            expect(txt).to.contains("Are you sure you want to delete this visit?");
        });

        // Needed since cypress will press ok automatically otherwise and delete the visit
        cy.on("window:confirm", () => false);
    })
*/
    it("Load 5 more visits - cycles by 5 visits", async () => {
        // Create a veterinarian with more than 10 visits
        cy.addNewVet("Lisa", "Mabuse").then( (vetId) => {
            // Create 15 visits
            for (let index = 1; index <= 15; index++) {
                let visitDate = new Date(Date.now());
                visitDate.setDate(visitDate.getDate() - 7 + index);
                cy.addNewVisit(1, 1, vetId, visitDate, "Testtermin " + index);
            }

            cy.visit("localhost:8080");
            cy.contains("Veterinarians").click();
            cy.contains("All").click();

            cy.get("table").get("tbody").children().last().contains("Show Visits").click();

            cy.get(".table > tr").should("have.length.lessThan", 10);

            // Save first entry so we can check if it cycles
            cy.get(".table > tr").first().children().first();
            // TODO: Press Show more visits button
            // TODO: Check if only 10 entries are shown
        });
    })
})