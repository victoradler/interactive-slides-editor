/// <reference types="cypress" />

describe('Teacher Page - Editor de Slides', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    cy.clearLocalStorage();
    
    // Visitar a página do professor
    cy.visit('/teacher');
  });

  describe('Navegação e Interface Básica', () => {
    it('deve carregar a página do professor corretamente', () => {
      cy.contains('Editor de Slides').should('be.visible');
      cy.get('.canvas-area').should('be.visible');
      cy.get('.sidebar').should('exist');
    });

    it('deve abrir e fechar o sidebar com o botão toggle', () => {
      // Verificar se sidebar está fechado inicialmente (em mobile)
      cy.viewport(375, 667); // Mobile viewport
      cy.get('.sidebar').should('not.have.class', 'open');
      
      // Abrir sidebar
      cy.get('.sidebar-toggle').click();
      cy.get('.sidebar').should('have.class', 'open');
      
      // Fechar sidebar clicando no botão
      cy.get('.sidebar-toggle').click();
      cy.get('.sidebar').should('not.have.class', 'open');
    });

    it('deve fechar sidebar ao clicar no overlay', () => {
      cy.viewport(375, 667);
      
      // Abrir sidebar
      cy.get('.sidebar-toggle').click();
      cy.get('.sidebar').should('have.class', 'open');
      
      // Clicar no overlay
      cy.get('.sidebar-overlay').click({ force: true });
      cy.get('.sidebar').should('not.have.class', 'open');
    });
  });

  describe('Gerenciamento de Slides', () => {
    it('deve adicionar um novo slide', () => {
      // Verificar se há pelo menos 1 slide inicial
      cy.get('.slides-list li').should('have.length.at.least', 1);
      
      // Adicionar novo slide
      cy.contains('Adicionar Slide').click();
      
      // Verificar se o slide foi adicionado
      cy.get('.slides-list li').should('have.length.at.least', 2);
    });

    it('deve selecionar um slide ao clicar nele', () => {
      // Adicionar alguns slides
      cy.contains('Adicionar Slide').click();
      cy.contains('Adicionar Slide').click();
      
      // Clicar no segundo slide
      cy.get('.slides-list li').eq(1).find('span').click();
      
      // Verificar se o slide está ativo
      cy.get('.slides-list li').eq(1).should('have.class', 'active');
    });

    it('deve excluir um slide', () => {
      // Adicionar alguns slides
      cy.contains('Adicionar Slide').click();
      cy.contains('Adicionar Slide').click();
      
      // Contar slides iniciais
      cy.get('.slides-list li').its('length').then((initialCount) => {
        // Excluir o último slide
        cy.get('.slides-list li').last().find('.slide-delete-btn').click();
        
        // Verificar que há um slide a menos
        cy.get('.slides-list li').should('have.length', initialCount - 1);
      });
    });
  });

  describe('Adição de Elementos', () => {
    it('deve adicionar elemento de texto ao slide', () => {
      // Clicar no botão de adicionar texto
      cy.contains('+ Texto').click();
      
      // Verificar que o sidebar fecha após adicionar
      cy.viewport(375, 667);
      cy.get('.sidebar-toggle').click();
      cy.contains('+ Texto').click();
      cy.get('.sidebar').should('not.have.class', 'open');
    });

    it('deve mostrar botão de adicionar imagem', () => {
      cy.contains('+ Imagem').should('be.visible');
    });
  });

  describe('Slides Interativos', () => {
    it('deve abrir modal de tipo de slide interativo', () => {
      cy.contains('Slide interativo').click();
      
      // Verificar que o modal abre
      cy.get('.interactive-slide-type-modal, [class*="Modal"]').should('be.visible');
    });

    it('deve criar slide de múltipla escolha', () => {
      // Abrir modal de tipo
      cy.contains('Slide interativo').click();
      
      // Selecionar múltipla escolha (pode precisar ajustar o seletor)
      cy.contains('Múltipla Escolha').click();
      
      // Verificar que um slide MC foi criado
      cy.get('.slides-list li').last().should('contain', '(MC)');
    });

    it('deve criar slide de nuvem de palavras', () => {
      // Abrir modal de tipo
      cy.contains('Slide interativo').click();
      
      // Selecionar word cloud
      cy.contains('Nuvem de Palavras').click();
      
      // Verificar que um slide WC foi criado
      cy.get('.slides-list li').last().should('contain', '(WC)');
    });

    it('deve mostrar botão de configurar pergunta para slide MC', () => {
      // Criar slide de múltipla escolha
      cy.contains('Slide interativo').click();
      cy.contains('Múltipla Escolha').click();
      
      // Verificar se o botão de configurar aparece
      cy.contains('⚙️ Configurar Pergunta').should('be.visible');
    });

    it('deve abrir modal de configuração de múltipla escolha', () => {
      // Criar slide de múltipla escolha
      cy.contains('Slide interativo').click();
      cy.contains('Múltipla Escolha').click();
      
      // Clicar em configurar
      cy.contains('⚙️ Configurar Pergunta').click();
      
      // Verificar que o modal de configuração abre
      cy.get('.multiple-choice-modal, [class*="Modal"]').should('be.visible');
    });

    it('deve mostrar botão de configurar word cloud para slide WC', () => {
      // Criar slide de word cloud
      cy.contains('Slide interativo').click();
      cy.contains('Nuvem de Palavras').click();
      
      // Verificar se o botão de configurar aparece
      cy.contains('⚙️ Configurar Word Cloud').should('be.visible');
    });
  });

  describe('Gerenciamento de Sessão', () => {
    it('deve mostrar botão de iniciar sessão quando há slides interativos', () => {
      // Criar slide interativo
      cy.contains('Slide interativo').click();
      cy.contains('Múltipla Escolha').click();
      
      // Verificar botão de iniciar sessão
      cy.contains('Iniciar sessão').should('be.visible');
    });

    it('deve abrir modal de sessão ao clicar em iniciar sessão', () => {
      // Criar slide interativo
      cy.contains('Slide interativo').click();
      cy.contains('Múltipla Escolha').click();
      
      // Clicar em iniciar sessão
      cy.contains('Iniciar sessão').click();
      
      // Verificar que o modal de sessão abre
      cy.get('.session-modal, [class*="Modal"]').should('be.visible');
    });

    it('deve mudar texto do botão após iniciar sessão', () => {
      // Criar slide interativo
      cy.contains('Slide interativo').click();
      cy.contains('Múltipla Escolha').click();
      
      // Iniciar sessão (simular)
      cy.contains('Iniciar sessão').click();
      
      // Fechar modal (se necessário)
      cy.get('body').then($body => {
        if ($body.find('[class*="close"], .modal-close').length > 0) {
          cy.get('[class*="close"], .modal-close').first().click();
        }
      });
      
      // Verificar que o texto mudou
      cy.contains('Gerenciar sessão').should('exist');
    });
  });

  describe('Persistência e LocalStorage', () => {
    it('deve manter slides após recarregar a página', () => {
      // Adicionar alguns slides
      cy.contains('Adicionar Slide').click();
      cy.contains('Adicionar Slide').click();
      
      // Contar slides
      cy.get('.slides-list li').its('length').then((count) => {
        // Recarregar página
        cy.reload();
        
        // Verificar que os slides persistiram
        cy.get('.slides-list li').should('have.length', count);
      });
    });

    it('deve persistir slide interativo após reload', () => {
      // Criar slide interativo
      cy.contains('Slide interativo').click();
      cy.contains('Múltipla Escolha').click();
      
      // Recarregar
      cy.reload();
      
      // Verificar que o slide MC ainda existe
      cy.get('.slides-list li').should('contain', '(MC)');
    });
  });

  describe('Responsividade', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1280, height: 720 },
    ];

    viewports.forEach((viewport) => {
      it(`deve renderizar corretamente em ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height);
        
        // Verificar elementos principais
        cy.contains('Editor de Slides').should('exist');
        cy.get('.canvas-area').should('be.visible');
        cy.get('.sidebar-toggle').should('be.visible');
      });
    });
  });

  describe('Workflow Completo', () => {
    it('deve completar fluxo de criação de apresentação interativa', () => {
      // 1. Adicionar slide regular
      cy.contains('Adicionar Slide').click();
      cy.get('.slides-list li').should('have.length.at.least', 2);
      
      // 2. Adicionar texto
      cy.contains('+ Texto').click();
      
      // 3. Criar slide de múltipla escolha
      cy.contains('Slide interativo').click();
      cy.contains('Múltipla Escolha').click();
      cy.get('.slides-list li').should('contain', '(MC)');
      
      // 4. Configurar pergunta
      cy.contains('⚙️ Configurar Pergunta').should('be.visible');
      
      // 5. Criar slide de word cloud
      cy.contains('Slide interativo').click();
      cy.contains('Nuvem de Palavras').click();
      cy.get('.slides-list li').should('contain', '(WC)');
      
      // 6. Iniciar sessão
      cy.contains('Iniciar sessão').click();
      cy.get('.session-modal, [class*="Modal"]').should('be.visible');
    });
  });
});
