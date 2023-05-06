import { faker } from '@faker-js/faker'

import signupPage from '../support/pages/signup/index'

describe('Testes de cadastro', () => {
  context('dado que o usuário é novo na plataforma', function () {
    const user = {
      name: faker.name.fullName(),
      email: 'luli@rovarova.com',
      password: 'pwd123'
    }

    before(function () {
      cy.task('removeUser', user.email)
        .then(function (result) {
          console.log(result)
        })
    })

    it('deve cadastrar um novo usuário', function () {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

    })
  })

  context('dado que o email já existe no banco de dados', function () {
    const user = {
      name: 'Voudar Erro',
      email: 'de@duplicidade.com',
      password: 'pwd123',
      is_provider: true,
    }

    before(function () {
      cy.task('removeUser', user.email)
        .then(function (result) {
          console.log(result)
        })
    })

    it('então deve exibir mensagem de email já cadastrado', function () {
      cy.task('removeUser', user.email)
        .then(function (result) {
          console.log(result)
        })

      cy.request(
        'POST',
        'http://localhost:3333/users',
        user
      ).then(function (response) {
        expect(response.status).to.eq(200)
      })

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
    })
  })

  context('quando o email é incorreto', function () {
    const user = {
      name: 'Voudar Erro',
      email: 'email.formatoinvalido.com',
      password: 'pwd123'
    }

    it('deve exibir mensagem de alerta', function () {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.alert.haveText('Informe um email válido')
    })
  })

  context('quando a senha é muito curta', function () {
    const passwords = [
      '1',
      '12',
      '12a',
      '1234',
      '!2$4#',
    ]

    beforeEach(function () {
      signupPage.go()
    })

    passwords.forEach(function (password) {
      it(`não deve cadastrar senha com menos de 6 dígitos: ${password}`, function () {
        const user = {
          name: "Carlos Minimalista",
          email: "cm@mail.com",
          password
        }

        signupPage.form(user)
        signupPage.submit()
      })
    })

    afterEach(function () {
      signupPage.alert.haveText('Pelo menos 6 caracteres')
    })

  })

  context('quando não é preenchido nenhum dado', function () {
    const alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória',
    ]

    before(function () {
      signupPage.go()
      signupPage.submit()
    })

    alertMessages.forEach(function (alertMessage) {
      it('deve exibir mensagem ' + alertMessage.toLocaleLowerCase(), function () {
        signupPage.alert.haveText(alertMessage)
      })
    })
  })
})
