/// <reference types="cypress" />
// cypress/support/commands.ts

// Solución SIMPLE para bypasear login
Cypress.Commands.add('bypassLogin', () => {
  cy.visit('/platform/dashboard', {
    onBeforeLoad: (win: Cypress.AUTWindow) => {
      // Mock usuario autenticado directamente
      (win as any).__FIREBASE_AUTH_MOCK__ = {
        currentUser: {
          uid: 'test-uid',
          email: 'test@cypress.com',
          providerData: [{ providerId: 'password' }],
          getIdToken: () => Promise.resolve('fake-token')
        },
        onAuthStateChanged: (callback: (user: any) => void) => {
          callback({
            uid: 'test-uid',
            email: 'test@cypress.com',
            providerData: [{ providerId: 'password' }],
            getIdToken: () => Promise.resolve('fake-token')
          })
          return () => {}
        }
      };
      
      (win as any).__GET_ID_TOKEN_MOCK__ = () => Promise.resolve('fake-token');
    }
  })
  
  // Interceptar APIs
  cy.intercept('POST', '**/auth/google', { statusCode: 200, body: {} })
  cy.intercept('POST', '**/auth/login', { statusCode: 200, body: {} })
})

// Declaración de tipos para TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando para bypasear el login y ir directo al dashboard
       * @example cy.bypassLogin()
       */
      bypassLogin(): Chainable<void>
    }
  }

  // Extender el tipo Window para incluir nuestros mocks
  interface Window {
    __FIREBASE_AUTH_MOCK__?: {
      currentUser: any
      onAuthStateChanged: (callback: (user: any) => void) => () => void
    }
    __GET_ID_TOKEN_MOCK__?: () => Promise<string>
  }
}

export {}