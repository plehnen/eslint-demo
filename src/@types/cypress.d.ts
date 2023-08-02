declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       *
       * @example
       *   cy.dataCy('greeting');
       */
      logIn(param?: { username: string; password: string }): Chainable;
    }
  }
}
export {};
