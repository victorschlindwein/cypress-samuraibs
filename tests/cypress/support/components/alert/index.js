import { el } from './elements'

class Alert {
  haveText(expectedText) {
    cy.contains(el.alertError, expectedText)
      .should('be.visible')
  }
}

export default new Alert