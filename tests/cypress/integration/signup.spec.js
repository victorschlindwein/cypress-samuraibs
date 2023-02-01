import { faker } from '@faker-js/faker'

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
      cy.visit('/signup')

      cy.get('input[placeholder="Nome"]').type(user.name)
      cy.get('input[placeholder="E-mail"]').type(user.email)
      cy.get('input[placeholder="Senha"]').type(user.password)

      // cy.intercept('POST', '/users', {
      //   statusCode: 200
      // }).as('postUser')

      cy.contains('button[type="submit"]', 'Cadastrar').click()

      // cy.wait('@postUser')

      cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
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

    it('deve exibir mensagem de email já cadastrado', function () {
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

      cy.visit('/signup')

      cy.get('input[placeholder="Nome"]').type(user.name)
      cy.get('input[placeholder="E-mail"]').type(user.email)
      cy.get('input[placeholder="Senha"]').type(user.password)

      cy.contains('button[type="submit"]', 'Cadastrar').click()

      cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Email já cadastrado para outro usuário.')
    })
  })
})
