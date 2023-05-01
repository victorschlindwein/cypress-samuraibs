import dashPage from "../support/pages/dash"
import loginPage from "../support/pages/login"

describe('login', function () {
  context('quando o usuário é muito bom', function () {

    const user = {
      name: 'Rovaris Barbeiro',
      email: 'rova@barber.com',
      password: 'pwd123',
      is_provider: true
    }

    before(function () {
      cy.postUser(user)
    })

    it('deve logar com sucesso', function () {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      dashPage.header.userLoggedIn(user.name)
    })
  })
})