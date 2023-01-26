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
        }
    )
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