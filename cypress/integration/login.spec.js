describe("When user is on login page, user", () => {
    it("Should be able to open the main page", () => {
        cy.visit("/");
        cy.contains("Books list");
    });

    it("Should be able to login with correct email and password", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.contains("Добро пожаловать bropet@mail.ru");
    });

    it("Should not be able to login with empty email", () => {
        cy.visit("/");
        cy.login(" ", "123");
        cy.get("#mail").then(($el) => cy.log($el));
        cy.get("#mail")
            .then(($el) => $el[0].checkValidity())
            .should("be.false");
    });
});