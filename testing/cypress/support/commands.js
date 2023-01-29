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
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add("addNewOwner", (firstName, lastName, address, city, telephone) => {
    cy.request(
        "POST", 
        "http://localhost:9966/petclinic/api/owners",
        {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            telephone: telephone
        }
    ).then(
        (response) => {
            expect(response.status).to.eq(201)
            return response.body.id;
        }
    )
})

Cypress.Commands.add("addNewVet", (firstName, lastName) => {
    cy.request(
        "POST", 
        "http://localhost:9966/petclinic/api/vets",
        {
            firstName: firstName,
            lastName: lastName,
            specialties: []
        }
    ).then(
        (response) => {
            expect(response.status).to.eq(201)
            return response.body.id;
        }
    )
})

Cypress.Commands.add("addNewVisit", (ownerId, petId, vetId, visitDate, visitDescription) => {
    cy.request(
        "POST", 
        "http://localhost:9966/petclinic/api/owners/" + ownerId +
            "/pets/" + petId + "/vets/" + vetId + "/visits",
        {
            date: visitDate,
            description: visitDescription
        }
    ).then(
        (response) => {
            expect(response.status).to.eq(201)
            return response.body.id;
        }
    )
})

Cypress.Commands.add("addNewPetToOwner", (OwnerFullname, petName, petBirthdate, petType) => {
    cy.visit("localhost:8080");
    cy.contains("Owners").click();
    cy.contains("Search").click();

    cy.get("#ownersTable").find("tbody").contains(OwnerFullname).click();
    
    cy.get("button").contains("Add New Pet").click();

    cy.get("input").find("name").type(petName);
    cy.get("input").find("birthDate").type(petBirthdate);
    cy.get("input").find("type").type(petType);
    cy.get("button").contains("Save Pet").click();
})

Cypress.Commands.add("deleteVet", (vetFullname) => {
    cy.visit("localhost:8080");
    cy.contains("Veterinarians").click();
    cy.contains("All").click();

    cy.get("#vets.table").find("tbody").children()
        .contains(vetFullname).parent().get("button").contains("Delete Vet").click();
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: "element"}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: "optional"}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })