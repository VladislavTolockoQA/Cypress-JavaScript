describe('Проверка авторизации', () => {
  const baseUrl = 'https://login.qa.studio';
  const correctEmail = 'german@dolnikov.ru';
  const correctPassword = 'iLoveqastudio1';
  const incorrectPassword = 'iLoveqastudio123';
  const incorrectEmail = 'german@d.ru';
  const noAtEmail = 'germandolnikov.ru';
  const mixedCaseEmail = 'GerMan@Dolnikov.ru';

  const checkMessage = (expectedText) => {
    cy.get('#messageHeader').should('contain', expectedText);
    cy.get('#exitMessageButton > .exitIcon').should('be.visible');
  };

  const login = (email, password) => {
    cy.visit(baseUrl);
    cy.get('#mail').type(email);
    cy.get('#pass').type(password);
    cy.get('#loginButton').click();
  };

  it('Успешная авторизация с верным логином и паролем', () => {
    login(correctEmail, correctPassword);
    checkMessage('Авторизация прошла успешно');
  });

  it('Восстановление пароля с валидным email', () => {
    cy.visit(baseUrl);
    cy.get('#forgotEmailButton').click();
    cy.get('#mailForgot').type(correctEmail);
    cy.get('#restoreEmailButton').click();
    checkMessage('Успешно отправили пароль на e-mail');
  });

  it('Ошибка при верном логине и неверном пароле', () => {
    login(correctEmail, incorrectPassword);
    checkMessage('Такого логина или пароля нет');
  });

  it('Ошибка при неверном логине и верном пароле', () => {
    login(incorrectEmail, correctPassword);
    checkMessage('Такого логина или пароля нет');
  });

  it('Ошибка при логине без @ и верном пароле', () => {
    login(noAtEmail, correctPassword);
    checkMessage('Нужно исправить проблему валидации');
  });

  it('Авторизация с логином в смешанном регистре', () => {
    login(mixedCaseEmail, correctPassword);
    checkMessage('Авторизация прошла успешно');
  });
});
