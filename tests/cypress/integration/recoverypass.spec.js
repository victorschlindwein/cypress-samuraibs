import forgotpassword from "../support/pages/forgotpassword"
import resetpassword from "../support/pages/resetpassword"

describe('resgate de senha', function () {
  before(function () {
    cy.fixture('recovery').then(function (recovery) {
      this.data = recovery
    })
  })

  context.only('quando o usuário esquece a senha', function () {

    before(function () {
      cy.postUser(this.data)
    })

    it('deve poder resgatar por email', function () {
      forgotpassword.go()
      forgotpassword.form(this.data.email)
      forgotpassword.submit()

      const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'

      forgotpassword.toast.shouldHaveText(message, { timeout: 10000 })
    })
  })

  context('quando o usuario solicita o resgate', function () {
    before(function () {
      cy.postUser(this.data)
      cy.recoveryPass(this.data.email)
    })

    it('deve poder cadastrar uma nova senha', function () {
      const newPass = '123pwd'
      const token = Cypress.env('recoveryToken')

      resetpassword.go(token)
      resetpassword.form(newPass)
      resetpassword.submit()

      const message = 'Agora você já pode logar com a sua nova senha secreta.'

      resetpassword.toast.shouldHaveText(message)
    })
  })
})