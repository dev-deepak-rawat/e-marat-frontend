
describe('manage user flow', () => {

    it('Manage user flow admin already logged in', () => {
        cy.intercept('GET', 'http:localhost:5000/api/users/').as('getUsers');
    
        cy.visit('/');
        cy.wait(3000);
        cy.visit('/users');

        cy.wait('@getUsers').then((interception) => {
            assert.isNotNull(interception.response.body, 'get users call has data');
        });
        cy.findByText(/Deepak/).should('be.visible');
    })

      

})