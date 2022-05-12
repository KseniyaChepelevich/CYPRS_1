describe("When user add the books", () => {

    it("Should be able to add a book", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.typeForm(
            "The Lord of the Rings",
            "J. R. R. Tolkien",
            "J. R. R. Tolkien"
        );
        cy.contains("Submit").click();
        cy.contains("The Lord of the Rings");
    });

    it("Should not be able to add a book with empty form", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.typeForm(" ", " ", " ");
        cy.contains("Submit").click();
        cy.get("[id='title']")
            .then(($el) => $el[0].checkValidity())
            .should("be.false");
    });

    it("Should be able to add a book with file", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.typeForm("Ofset", "Muller", "About ofset");

        cy.fixture("muller_ofset.pdf").then((fileContent) => {
            cy.get("#fileBook").attachFile({
                fileContent: fileContent.toString(),
                fileName: "muller_ofset.pdf",
                mimeType: "application/pdf",
                encoding: "base64",
            });
        });
    });

    it("Should be able to add a book to favorite", () => {
        cy.visit("/");
        cy.login("bropet@mail.ru", "123");
        cy.typeForm("Harry Potter", "J. R.", "J. R.");
        cy.contains("Submit").click();
        cy.contains("Harry Potter");
        cy.get(".card-body").contains("Harry Potter").parent().siblings().children("button").click();
        cy.contains("Favorites").click();
        cy.contains("Harry Potter");
    });
})