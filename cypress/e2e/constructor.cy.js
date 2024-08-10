describe("Test burger constructor", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.visit("http://localhost:5173/");
  });

  // Перетаскивание ингредиента в конструктор
  it("correct DnD ingredient", () => {
    // bun
    cy.get("[data-testid=card_ingredient]").first().trigger("dragstart");
    cy.get("[data-testid=drop_bun]").first().trigger("drop");
    cy.get("[data-testid=card_ingredient]").first().trigger("dragstart");
    cy.get("[data-testid=drop_bun]").last().trigger("drop");

    // other
    cy.get("[data-testid=card_ingredient]").last().trigger("dragstart");
    cy.get("[data-testid=drop_other]").trigger("drop");
  });

  it("should open modal with ingredients details by click ingredient card", () => {
    // открытие модального окна с описанием ингредиента
    cy.get("[data-testid=card_ingredient]").first().click();
    cy.get("[data-testid=title-modal").should("have.text", "Детали ингредиента");

    // отображение в модальном окне данных ингредиента
    cy.get("[data-testid=ingredient_name").should("have.text", "Краторная булка N-200i");
  });

  // Закрытие модального окна по клику на крестик
  it("should close modal by click close button", () => {
    cy.get("[data-testid=card_ingredient]").first().click();
    cy.get("[data-testid=close_modal]").click();
  });

  // Закрытие модального окна при нажатии `Esc`
  it("should close modal by tap Esc", () => {
    cy.get("[data-testid=card_ingredient]").first().click();
    cy.get("body").trigger("keyup", { keyCode: 27 });
  });

  // Закрытие модального окна при клике на overlay
  it("should close modal by click overlay", () => {
    cy.get("[data-testid=card_ingredient]").first().click();
    cy.get("[data-testid=overlay_modal]").click("topLeft");
  });
});

describe("Ingredient detail page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/ingredients/643d69a5c3f7b9001cfa093d");
  });
  it("should open page with ingredients details", () => {
    cy.get("[data-testid=ingredient_name").should("have.text", "Флюоресцентная булка R2-D3");
  });
});
