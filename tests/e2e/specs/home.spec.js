// https://docs.cypress.io/api/introduction/api.html

describe('Ponyracer', () => {
  it('should display title on home page', () => {
    cy.visit('/');
    cy.contains('h1', 'Ponyracer');
  });
});
