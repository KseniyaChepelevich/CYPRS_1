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
        cy.contains("Add new").click();
        cy.contains("Book description");
        cy.get("#title").type("Harry Potter");
        cy.get("#description").type(
            "this is a story about a boy who got into the school of magic"
        );
        cy.get("#authors").type("J. K. Rowling");
        cy.contains("Submit").click();
        cy.contains("Harry Potter");
    });

    it("Should not be able to add a book with empty form", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.contains("Add new").click();
        cy.contains("Book description");
        cy.get("#title").type(" ");
        cy.get("#description").type(" ");
        cy.get("#authors").type(" ");
        //cy.contains("Submit").click();
        cy.get("#title")
            .then(($el) => $el[0].checkValidity())
            .should("be.false");
        cy.get("#authors")
            .then(($el) => $el[4].checkValidity())
            .should("be.false");
    });

    it("Should be able to add a book file", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.contains("Add new").click();
        cy.contains("Book description");
        cy.get("#title").type("Harry Potter");
        cy.get("#description").type(
            "this is a story about a boy who got into the school of magic"
        );
        cy.fixture("testPicture.png").then((fileContent) => {
            cy.get("#fileCover").attachFile({
                fileContent: fileContent.toString(),
                fileName: "testPicture.png",
                mimeType: "image/png",
            });
        });
    });

    it("Should be able to add a book to favorite", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.get(
            '[href="book/71e6d64d-712e-4276-8285-babcf47a09ff"] > .h-100 > .card-footer > .btn'
        ).click();
    });
});