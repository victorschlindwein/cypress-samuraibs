import forgotpassword from "../support/pages/forgotpassword"

describe('resgate de senha', function () {
  before(function () {
    cy.fixture('recovery').then(function (recovery) {
      this.data = recovery
    })
  })

  context('quando o usuário esquece a senha', function () {

    before(function () {
      cy.postUser(this.data)
    })

    it('deve poder resgatar por email', function () {
      forgotpassword.go()
      forgotpassword.form(this.data.email)
      forgotpassword.submit()

      const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'

      forgotpassword.toast.shouldHaveText(message)
    })
  })
})