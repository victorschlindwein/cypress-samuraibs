import { faker } from '@faker-js/faker'

it('deve cadastrar um novo usuário', function () {
  const name = faker.name.fullName()
  const email = 'luli@rovarova.com'
  const password = 'pwd123'

  cy.task('removeUser', email)
    .then(function (result) {
      console.log(result)
    })

  cy.visit('/signup')

  cy.get('input[placeholder="Nome"]').type(name)
  cy.get('input[placeholder="E-mail"]').type('luli@rovarova.com')
  cy.get('input[placeholder="Senha"]').type(password)

  // cy.intercept('POST', '/users', {
  //   statusCode: 200
  // }).as('postUser')

  cy.contains('button[type="submit"]', 'Cadastrar').click()

  // cy.wait('@postUser')

  cy.get('.toast')
    .should('be.visible')
    .find('p')
    .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')
})

it('deve dar erro de cadastro', function () {
  const name = faker.name.fullName()
  const email = 'luli@rovarova.com'
  const password = 'pwd123'

  cy.visit('/signup')

  cy.get('input[placeholder="Nome"]').type(name)
  cy.get('input[placeholder="E-mail"]').type(email)
  cy.get('input[placeholder="Senha"]').type(password)

  cy.contains('button[type="submit"]', 'Cadastrar').click()

  cy.get('.toast')
    .should('be.visible')
    .find('p')
    .should('have.text', 'Email já cadastrado para outro usuário.')
})
