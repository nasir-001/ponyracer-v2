// https://docs.cypress.io/api/introduction/api.html

const user = {
  id: 1,
  login: 'cedric',
  money: 1000,
  registrationInstant: '2015-12-01T11:00:00Z',
  token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'
};

function startBackend() {
  cy.server({ force404: true });

  cy.route({
    method: 'POST',
    url: 'api/users/authentication',
    response: user
  }).as('authenticateUser');
}

describe('Login', () => {
  beforeEach(() => startBackend());

  it('should display a login page', () => {
    cy.visit('/login');

    const loginInput = () => cy.get('input').first();
    const passwordInput = () => cy.get('input[type=password]');
    const errorMessage = () => cy.get('.invalid-feedback');

    cy.get('button').should('be.visible').and('be.disabled');
    loginInput().type('c');
    loginInput().clear();
    errorMessage().should('be.visible').and('contain', 'The login is required');
    loginInput().type('ced');
    errorMessage().should('not.be.visible');

    passwordInput().type('p');
    passwordInput().clear();
    errorMessage().should('be.visible').and('contain', 'The password is required');

    passwordInput().type('pa');
    errorMessage().should('not.be.visible');

    cy.get('form > button').click();
    cy.wait('@authenticateUser');

    cy.location('pathname').should('eq', '/');
  });
});
