import { faker } from '@faker-js/faker'

it('deve cadastrar um novo usuário', function () {
  const name = faker.name.findName()
  const email = faker.internet.email()
  const password = 'pwd123'

  cy.visit('/signup')

  cy.get('input[placeholder="Nome"]').type(name)
  cy.get('input[placeholder="E-mail"]').type(email)
  cy.get('input[placeholder="Senha"]').type(password)

  cy.contains('button[type="submit"]', 'Cadastrar').click()

  cy.get('.toast')
    .should('be.visible')
    .find('p')
    .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')
})