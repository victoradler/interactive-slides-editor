// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create a new slide
       * @example cy.createSlide()
       */
      createSlide(): Chainable<void>
      
      /**
       * Custom command to create a multiple choice slide
       * @example cy.createMultipleChoiceSlide()
       */
      createMultipleChoiceSlide(): Chainable<void>
      
      /**
       * Custom command to create a word cloud slide
       * @example cy.createWordCloudSlide()
       */
      createWordCloudSlide(): Chainable<void>
      
      /**
       * Custom command to select a slide by index
       * @example cy.selectSlide(0)
       */
      selectSlide(index: number): Chainable<void>
      
      /**
       * Custom command to start a session
       * @example cy.startSession()
       */
      startSession(): Chainable<void>
    }
  }
}

// Create a new slide
Cypress.Commands.add('createSlide', () => {
  cy.contains('Adicionar Slide').click();
});

// Create a multiple choice slide
Cypress.Commands.add('createMultipleChoiceSlide', () => {
  cy.contains('Slide interativo').click();
  cy.contains('Múltipla Escolha').click();
});

// Create a word cloud slide
Cypress.Commands.add('createWordCloudSlide', () => {
  cy.contains('Slide interativo').click();
  cy.contains('Nuvem de Palavras').click();
});

// Select a slide by index
Cypress.Commands.add('selectSlide', (index: number) => {
  cy.get('.slides-list li').eq(index).find('span').click();
});

// Start a session
Cypress.Commands.add('startSession', () => {
  cy.contains('Iniciar sessão').click();
});

export {}

