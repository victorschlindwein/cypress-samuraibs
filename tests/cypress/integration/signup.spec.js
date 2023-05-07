import signupPage from '../support/pages/signup/index'

describe('Testes de cadastro', () => {

  before(function () {
    cy.fixture('signup').then(function (signup) {
      this.sucess = signup.sucess
      this.email_dup = signup.email_dup
      this.email_incorrect = signup.email_incorrect
      this.short_password = signup.short_password
    })
  })

  context('dado que o usuário é novo na plataforma', function () {
    before(function () {
      cy.task('removeUser', this.sucess.email)
        .then(function (result) {
          console.log(result)
        })
    })

    it('deve cadastrar um novo usuário', function () {
      signupPage.go()
      signupPage.form(this.sucess)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    })
  })

  context('dado que o email já existe no banco de dados', function () {
    before(function () {
      cy.postUser(this.email_dup)
    })

    it('então deve exibir mensagem de email já cadastrado', function () {
      signupPage.go()
      signupPage.form(this.email_dup)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
    })
  })

  context('dado que o email é incorreto', function () {
    it('então deve exibir mensagem de alerta', function () {
      signupPage.go()
      signupPage.form(this.email_incorrect)
      signupPage.submit()
      signupPage.alert.haveText('Informe um email válido')
    })
  })

  context('dado que a senha é muito curta', function () {
    const passwords = [
      '1',
      '12',
      '12a',
      '1234',
      '!2$4#',
    ]

    passwords.forEach(function (password) {
      it(`então não deve cadastrar senha com menos de 6 dígitos: ${password}`, function () {

        this.short_password.password = password

        signupPage.go()
        signupPage.form(this.short_password)
        signupPage.submit()
      })
    })

    afterEach(function () {
      signupPage.alert.haveText('Pelo menos 6 caracteres')
    })
  })

  context('dado que não foi preenchido nenhum dado', function () {
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
      it(`então deve exibir mensagem ${alertMessage.toLocaleLowerCase()}`, function () {
        signupPage.alert.haveText(alertMessage)
      })
    })
  })
})
