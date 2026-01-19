Cypress.Commands.add('serviceCriarUsuario', (nome, email, password, administrador = 'true') => {
    return cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            nome,
            email,
            password,
            administrador
        },
        failOnStatusCode: false
    });
});


Cypress.Commands.add('serviceBuscarPorNome', (nome) => {
    cy.log('Buscando usuário pelo nome: ${nome}');
    console.log('GET /usuarios?nome=', nome);

    return cy.request({
        method: 'GET',
        url: 'https://serverest.dev/usuarios',
        headers: {
            accept: 'application/json'
        },
        qs: { nome },
        failOnStatusCode: false
    });

});

Cypress.Commands.add('serviceAtualizarUsuario', (userId, userData) => {
    cy.log('Atualizando usuário ID: ${userId}');
    console.log('PUT /usuarios/', userId, userData);

    return cy.request({
        method: 'PUT',
        url: 'https://serverest.dev/usuarios/${userId}',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: userData,
        failOnStatusCode: false
    });
});
