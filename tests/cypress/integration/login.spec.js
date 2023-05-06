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

  context('quando o usuário é bom mas a senha é ruim', function () {

    let user = {
      name: 'Rovaris Barbeiro',
      email: 'rova@barber.com',
      password: 'pwd123',
      is_provider: true
    }

    before(function () {
      cy.postUser(user).then(function () {
        user.password = 'cavalo123'
      })
    })

    it('deve notificar erro nas credenciais ao logar', function () {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()

      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

      loginPage.toast.shouldHaveText(message)
    })
  })

  context('quando o formato do email é inválido', function () {
    const emails = [
      'rova.com.br',
      'rova.com',
      '@rova.com',
      '@',
      'r@v4',
      '1111',
      '$*##*#',
      'siadj123'
    ]

    before(function () {
      loginPage.go()
    })

    emails.forEach(function (email) {
      it('não deve logar com o email: ' + email, function () {
        const user = { email, password: 'cavalo123' }

        loginPage.form(user)
        loginPage.submit()
        loginPage.alert.haveText('Informe um email válido')
      })
    })
  })

  context('quando não é preenchido nenhum dado', function () {
    const alertMessages = [
      'E-mail é obrigatório',
      'Senha é obrigatória',
    ]

    before(function () {
      loginPage.go()
      loginPage.submit()
    })

    alertMessages.forEach(function (alertMessage) {
      it('deve exibir mensagem ' + alertMessage.toLocaleLowerCase(), function () {
        loginPage.alert.haveText(alertMessage)
      })
    })
  })
})