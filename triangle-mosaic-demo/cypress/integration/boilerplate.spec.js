/// <reference types="cypress" />
/* global cy context */

context('Viewport', () => {
  beforeEach(() => {
    cy.visit('https://localhost:3000')
  })

  it('Link opens the correct URL on a new tab', () => {
    cy.get('a')
      .contains('Learn React')
      .should('have.attr', 'href', 'https://reactjs.org')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
  })
})
