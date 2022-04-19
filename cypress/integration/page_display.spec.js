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

    it("Should be able to add a book", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.typeForm("The Lord of the Rings", "J. R. R. Tolkien", "J. R. R. Tolkien")
        cy.contains("Submit").click();
        cy.contains("The Lord of the Rings");
    });

    it("Should not be able to add a book with empty form", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.typeForm(" ", " ", " ")
        cy.contains("Submit").click();
        cy.get("#title")
            .then(($el) => $el[0].checkValidity())
            .should("be.false");

    });

    it("Should be able to add a book file", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.typeForm("Harry Potter", "this is a story about a boy who got into the school of magic", "J. K. Rowling")
        cy.fixture("testPicture.png").then((fileContent) => {
            cy.get("#fileCover").attachFile({
                fileContent: fileContent.toString(),
                fileName: "testPicture.png",
                mimeType: "image/png",
            });
        });
    });
});