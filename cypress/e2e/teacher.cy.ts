describe('Teacher - Interactive Slide Creation', () => {
  // Função auxiliar para gerar perguntas aleatórias
  const generateRandomQuestion = () => {
    const questions = [
      'Qual é a capital do Brasil?',
      'Quem descobriu o Brasil?',
      'Qual é o maior planeta do sistema solar?',
      'Quantos continentes existem no mundo?',
      'Qual é a fórmula da água?',
      'Em que ano o homem pisou na Lua?',
      'Qual é a velocidade da luz?',
      'Quem pintou a Mona Lisa?'
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  // Função auxiliar para gerar opções aleatórias
  const generateRandomOptions = (count: number = 4) => {
    const possibleOptions = [
      'Brasília', 'Rio de Janeiro', 'São Paulo',
      'Pedro Álvares Cabral', 'Cristóvão Colombo', 'Vasco da Gama',
      'Júpiter', 'Saturno', 'Marte', 'Terra',
      '5', '6', '7', '8',
      'H2O', 'CO2', 'O2', 'N2',
      '1969', '1972', '1965', '1975',
      '300.000 km/s', '150.000 km/s', '500.000 km/s',
      'Leonardo da Vinci', 'Michelangelo', 'Van Gogh', 'Picasso'
    ];
    
    // Embaralha e pega as primeiras 'count' opções
    const shuffled = possibleOptions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  beforeEach(() => {
    // Limpa o localStorage antes de cada teste
    cy.clearLocalStorage();
    
    // Visita a página do professor
    cy.visit('/teacher');
    
    // Aguarda o carregamento da página
    cy.get('.teacher-page').should('be.visible');

    // Concede permissões de clipboard
    cy.wrap(
      Cypress.automation('remote:debugger:protocol', {
        command: 'Browser.grantPermissions',
        params: {
          permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
          origin: window.location.origin,
        },
      })
    );
  });

  it('deve criar um slide interativo de múltipla escolha com perguntas e respostas aleatórias', () => {
    // Gera dados aleatórios para o teste
    const randomQuestion = generateRandomQuestion();
    const randomOptions = generateRandomOptions(3);

    cy.log('Pergunta gerada: ' + randomQuestion);
    cy.log('Opções geradas: ' + randomOptions.join(', '));

    // 1. Clica em "Slide interativo"
    cy.get('.btn-addslide-interactive')
      .should('be.visible')
      .click();

    // 2. Escolhe "Sessão de perguntas e respostas"
    cy.get('.interactive-type-modal')
      .should('be.visible');
    cy.contains('h4', 'Sessão de perguntas e respostas').click();

    // Verifica se o slide foi criado e abre automaticamente o modal de configuração
    cy.get('.slides-list')
      .should('contain', '• (MC)');

    // Aguarda o modal de configuração aparecer (pode abrir automaticamente)
    cy.get('.btn-configure-mc', { timeout: 1000 })
      .should('be.visible')
      .click();

    cy.get('.mc-modal')
      .should('be.visible');

    // 3. Faz uma pergunta e três opções como resposta
    cy.get('.mc-modal')
      .find('input')
      .first()
      .clear()
      .type(randomQuestion);

    randomOptions.forEach((option, index) => {
      cy.get('.mc-modal')
        .find('input')
        .eq(index + 1)
        .clear()
        .type(option);
    });

    // 4. Fecha o modal
    cy.get('.modal-close-btn').click();
    cy.get('.mc-modal').should('not.exist');

    // 5. Clica em "Iniciar sessão"
    cy.contains('button', 'Iniciar sessão').click();

    cy.get('.session-modal')
      .should('be.visible')
      .and('contain', 'Código da Sala');

    // 6. Fecha o modal
    cy.get('.modal-close-btn').click();
    cy.get('.session-modal').should('not.exist');

    // 7. Clica novamente em "Configurar pergunta"
    cy.get('.btn-configure-mc')
      .should('be.visible')
      .click();

    cy.get('.mc-modal')
      .should('be.visible');

    // 8. Aperta para publicar para os alunos
    cy.contains('button', 'Publicar para alunos').click();

    // Verifica se foi publicado com sucesso
    cy.get('.mc-modal')
      .should('contain', 'Pergunta publicada');

    cy.log('✅ Slide publicado com sucesso para os alunos!');
  });

  it('deve criar múltiplos slides interativos com perguntas aleatórias', () => {
    const numberOfSlides = 3;

    for (let i = 0; i < numberOfSlides; i++) {
      const randomQuestion = generateRandomQuestion();
      const randomOptions = generateRandomOptions(3);

      cy.log(`Criando slide ${i + 1}/${numberOfSlides}`);
      cy.log('Pergunta: ' + randomQuestion);

      // Adiciona novo slide interativo
      cy.get('.btn-addslide-interactive').click();
      cy.get('.interactive-type-modal').should('be.visible');
      cy.contains('h4', 'Sessão de perguntas e respostas').click();

      // Aguarda um pouco para o slide ser criado
      cy.wait(500);

      // Configura o slide
      cy.get('.btn-configure-mc').click();
      cy.get('.mc-modal').should('be.visible');

      // Preenche pergunta e opções
      cy.get('.mc-modal')
        .find('input')
        .first()
        .clear()
        .type(randomQuestion);

      randomOptions.forEach((option, index) => {
        cy.get('.mc-modal')
          .find('input')
          .eq(index + 1)
          .clear()
          .type(option);
      });

      // Fecha o modal
      cy.get('.modal-close-btn').click();
      cy.get('.mc-modal').should('not.exist');
    }

    // Verifica se todos os slides foram criados
    cy.get('.slides-list')
      .find('li')
      .should('have.length.at.least', numberOfSlides);

    // Verifica se todos são slides de múltipla escolha
    cy.get('.slides-list')
      .find('li')
      .each(($el) => {
        cy.wrap($el).should('contain', '• (MC)');
      });
  });

  it('deve navegar entre slides interativos criados', () => {
    // Cria 2 slides interativos
    for (let i = 0; i < 2; i++) {
      cy.get('.btn-addslide-interactive').click();
      cy.get('.interactive-type-modal').should('be.visible');
      cy.contains('h4', 'Sessão de perguntas e respostas').click();
      cy.wait(300);
    }

    // Pega todos os slides
    cy.get('.slides-list li').then(($slides) => {
      const slideCount = $slides.length;
      
      // Navega por cada slide
      for (let i = 0; i < slideCount; i++) {
        cy.get('.slides-list li').eq(i).find('span').click();
        
        // Verifica se o slide está ativo
        cy.get('.slides-list li').eq(i).should('have.class', 'active');
        
        // Aguarda um pouco antes de navegar para o próximo
        cy.wait(200);
      }
    });
  });

  it('deve copiar o link do aluno e verificar se está correto', () => {
    // Ignora erros de clipboard no Cypress
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Clipboard') || err.message.includes('writeText')) {
        return false;
      }
      return true;
    });

    // 1. Cria um slide interativo
    cy.get('.btn-addslide-interactive').click();
    cy.get('.interactive-type-modal').should('be.visible');
    cy.contains('h4', 'Sessão de perguntas e respostas').click();

    cy.get('.slides-list').should('contain', '• (MC)');

    // 2. Inicia a sessão
    cy.contains('button', 'Iniciar sessão').click();
    cy.get('.session-modal').should('be.visible').and('contain', 'Código da Sala');

    // 3. Captura o ID da sessão (código da sala)
    cy.get('.session-modal__code').invoke('text').then((sessionId) => {
      cy.log('Código da Sala: ' + sessionId);

      // 4. Verifica se o link do aluno está correto no modal
      const expectedLink = `http://localhost:5173/student/${sessionId}`;
      cy.get('.session-modal__link')
        .should('contain', `localhost:5173/student/${sessionId}`)
        .invoke('text')
        .should('equal', expectedLink);

      // 5. Tenta clicar no botão de copiar (pode falhar no Cypress mas está OK)
      cy.contains('button', 'Copiar Link').should('be.visible').click();

      cy.log('✅ Botão de copiar clicado!');

      // 6. Fecha o modal
      cy.get('.modal-close-btn').click();
      cy.get('.session-modal').should('not.exist');

      // 7. Visita a rota do aluno com o ID capturado
      cy.visit(`/student/${sessionId}`);

      // 8. Verifica se a URL está correta
      cy.url().should('include', `/student/${sessionId}`);
      cy.url().should('equal', expectedLink);

      // 9. Verifica se a página do aluno carregou corretamente
      cy.get('body').should('be.visible');
      
      cy.log('✅ Página do aluno acessada com sucesso!');
      cy.log('✅ URL verificada: ' + expectedLink);
    });
  });


});
