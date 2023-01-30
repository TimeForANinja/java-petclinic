/// <reference types="Cypress" />

describe("Show all visits for a vet", () => {
    it("Show visitdata for a vet", () => {
        cy.visit(Cypress.config("frontendUrl"));
        cy.contains("Veterinarians").click();
        cy.contains("All").click();

        // get first entry in list
        cy.get("#vets.table").find("tbody").children().first().contains("Show Visits").click();

        // Check AK1: Show per visit {Pet, VisitDate, Description, Owner}
        cy.get("table").find("thead").contains("Pet").should("exist");
        cy.get("table").find("thead").contains("Visit Date").should("exist");
        cy.get("table").find("thead").contains("Description").should("exist");
        cy.get("table").find("thead").contains("Owner").should("exist");
    })

    it("Buttons exist in visit list", () => {
        cy.visit(Cypress.config("frontendUrl"));
        cy.contains("Veterinarians").click();
        cy.contains("All").click();

        // Get first entry in list
        cy.get("#vets.table").find("tbody").children().first().contains("Show Visits").click();

        // Get only the table rows (except table header)
        cy.get(".table > tr").each(($entry) => {
            // Check if buttons exist by text
            cy.wrap($entry).get("button").contains("Edit Visit").should("exist");
            cy.wrap($entry).get("button").contains("Delete Visit").should("exist");
            cy.wrap($entry).children().eq(2-1).children().should("have.attr", "href");
        })
    })

    it("Delete visit has a confirmation", () => {
        cy.visit(Cypress.config("frontendUrl"));
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

    it("5 next/prev button - cycles by 5 visits", async () => {
        // Create a veterinarian with more than 10 visits
        cy.addNewVet("Lisa", "Mabuse").then( (vetId) => {
            // Create 15 visits
            for (let index = 1; index <= 15; index++) {
                let visitDate = new Date(Date.now());
                visitDate.setDate(visitDate.getDate() - 7 + index);
                cy.addNewVisit(1, 1, vetId, visitDate, "Testtermin " + index);
            }

            cy.visit(Cypress.config("frontendUrl"));
            cy.contains("Veterinarians").click();
            cy.contains("All").click();

            cy.get("table").get("tbody").children().last().contains("Show Visits").click();

            cy.get(".table > tr").should("have.length.at.most", 10);

            // Check if first entry is first testvisit
            cy.get(".table > tr").children().first()
                .children().first().contains("Testtermin 1").should("exist");

            cy.get("button").contains("5 next").click();
            cy.get(".table > tr").should("have.length.at.most", 10);

            // Check if first entry is now the 6th testvisit
            cy.get(".table > tr").children().first()
                .children().first().contains("Testtermin 6").should("exist");

            cy.get("button").contains("5 prev").click();
            cy.get(".table > tr").should("have.length.at.most", 10);

            // Check if first entry is first testvisit again
            cy.get(".table > tr").children().first()
                .children().first().contains("Testtermin 1").should("exist");
        });
    })
})