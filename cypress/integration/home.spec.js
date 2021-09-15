describe('Home Page testing', () => {

    it('Landed on home page', () => {
      cy.visit('/');
      cy.findByText(/Connect together to build a smart society/i).should('be.visible');
    });

    it('Resident Login flow', () => {
        cy.log('Enter test phone no.');
        cy.findByPlaceholderText(/Mobile Number/i).clear().type('8888888888');
        cy.findByRole('button', { name: /send otp/i }).click();

        cy.log('wait for 5 seconds to send otp')
        cy.wait(7000);

        cy.log('Enter test otp');
        cy.findByPlaceholderText(/Enter OTP/i).clear().type('123456');

        cy.log('Verify Otp');
        cy.findByRole('button', { name: /verify/i }).click();

        cy.wait(9000)
        cy.location().should((loc) => {
            expect(loc.pathname.toString()).to.contain('/social-feed');
          });
    })
});