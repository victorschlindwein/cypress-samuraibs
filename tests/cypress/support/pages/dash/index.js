import { el } from './elements'
import header from "../../components/header"

class DashPage {

  constructor() {
    this.header = header
  }

  calendarShouldBeVisible() {
    cy.get(el.calendario, { timeout: 7000 }).should('be.visible')
  }

  selectDay(day) {
    // legenda regex:
    // ^ => começa com
    // $ => acaba
    // g => modificador global

    const target = new RegExp('^' + day + '$', 'g')
    cy.contains(el.dia, target).click()
  }

  appointmentShouldBe(customer, hour) {
    cy.contains('div', customer.name)
      .should('be.visible')
      .parent()
      .contains('span[class="appointment"]', hour)
      .should('be.visible')
  }
}

export default new DashPage()