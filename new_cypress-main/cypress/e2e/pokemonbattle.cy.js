describe('Проверка покупки нового аватара', function () {
    it('e2e тест на покупку нового аватара для тренера', function () {
        // Логин и пароль (замени на свои)
        const login = 'USER_LOGIN';
        const password = 'USER_PASSWORD';

        // Данные карты
        const cardNumber = '4620869113632996';
        const cardCVV = '125';
        const cardDate = '1226';
        const cardHolder = 'NAME';

        cy.visit('https://pokemonbattle.ru/');

        // Вход в систему
        cy.get('input[id="k_email"]').type(login);
        cy.get('input[id="k_password"]').type(password);
        cy.get('button[type="submit"]').click();

        // Ждём перехода и загрузки страницы
        cy.wait(2000);

        // Переход в профиль
        cy.get('.header_card_trainer').click();
        cy.wait(2000);

        // Нажатие на кнопку "Смена аватара"
        cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click();

        // Проверка наличия хотя бы одного доступного аватара
        cy.get('.available > button').first().click();

        // Ввод данных карты
        cy.get('.card_number').type(cardNumber);
        cy.get('.card_csv').type(cardCVV);
        cy.get('.card_date').type(cardDate);
        cy.get('.card_name').type(cardHolder);

        // Оплата
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();

        // Подтверждение оплаты (3DS)
        cy.get('.threeds_number').type('56456');
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();

        // Проверка успешной покупки
        cy.contains('Покупка прошла успешно').should('be.visible');
    });
});
