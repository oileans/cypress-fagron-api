describe('API - Cadastro de Usuário', () => {

  it('POST - Criação de usuário', () => {
    const email = `fagron_${Date.now()}@teste.com.br`;

    cy.serviceCriarUsuario(
      'Fagron Santos',
      email,
      'teste',
      'true'
    ).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
    });
  });

  it('POST - Tentativa de cadastro duplicado', () => {
    const email = `duplicado_${Date.now()}@teste.com.br`;

    cy.serviceCriarUsuario('Teste Dup', email, '123456', 'true');

    cy.serviceCriarUsuario('Teste Dup', email, '123456', 'true')
      .then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('Este email já está sendo usado');
      });
  });

  it('GET - Busca de usuário por nome', () => {
    cy.serviceBuscarPorNome('Fagron Santos').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios[0].nome).to.eq('Fagron Santos');
    });
  });

  it('PUT - Atualizar cadastro de usuario', () => {
    const id = '3j6sAUWTqU7CJmEV';

    const payload = {
      nome: 'Fagron Santos Silva',
      email: 'fagron_1111@teste.com.br',
      password: '12345',
      administrador: 'true'
    };

    cy.serviceAtualizarUsuario(id, payload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Registro alterado com sucesso');
    });
  });


});
