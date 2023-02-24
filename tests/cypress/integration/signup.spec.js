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
})
