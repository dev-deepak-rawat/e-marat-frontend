describe('Test Social Feed', () => {
	// Click on social feed link in dashboard

	it('Landed on home page', () => {
		cy.visit('/social-feed');
		cy.get('.site-layout-background')
			.first()
			.should('have.text', 'Social Feed')
			.should('be.visible');
	});
});
