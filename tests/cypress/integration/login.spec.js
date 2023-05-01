import loginPage from "../support/pages/login"

describe('login', function () {
  context('quando o usuário é muito bom', function () {

    const user = {
      email: 'rova@barber.com',
      password: 'pwd123'
    }

    it('deve logar com sucesso', function () {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()
    })
  })
})