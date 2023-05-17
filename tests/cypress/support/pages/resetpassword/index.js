import { el } from './elements'

import toast from '../../components/toast'

class ResetPassPage {
  constructor() {
    this.toast = toast
  }

  go(token) {
    cy.visit('http://localhost:3000/reset-password?token=' + token)
  }

  form(newPass) {
    cy.get(el.password)
      .clear()
      .type(newPass)

    cy.get(el.passwordConfirm)
      .clear()
      .type(newPass)
  }

  submit() {
    cy.contains(el.changePassButton)
      .click()
  }
}

export default new ResetPassPage()