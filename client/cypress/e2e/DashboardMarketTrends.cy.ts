/// <reference types="cypress" />

// cypress/e2e/dashboard-market-trends.cy.ts
describe('DashboardMarketTrendsChart - Pruebas Estáticas', () => {
  beforeEach(() => {
    cy.bypassLogin()
  })

  it('Debe navegar a /platform/dashboard y cargar el componente Market Trends correctamente', () => {
    cy.visit('/platform/dashboard')

    cy.url().should('include', '/platform/dashboard')
    cy.get('.flex.min-h-screen').should('be.visible')
    cy.contains('Market Trends').should('be.visible')

    cy.log('✅ Prueba básica completada: El componente Market Trends carga correctamente')
  })

  describe('🧪 PRUEBAS ESTÁTICAS - Casos Exitosos y Fallidos', () => {
    describe('✅ CASOS EXITOSOS ESTÁTICOS', () => {
      it('Debe mostrar correctamente toda la estructura y elementos del Market Trends Chart', () => {
        cy.visit('/platform/dashboard')

        // VERIFICAR ESTRUCTURA COMPLETA DEL COMPONENTE
        // Contenedor principal con todas las clases específicas
        cy.get('.w-full.max-w-md.p-4.shadow-xl.rounded-xl.bg-white').should('be.visible')

        // Header del componente con flexbox
        cy.get('.flex.flex-row.justify-between.items-center.pb-6').should('be.visible')

        // Título y descripción
        cy.contains('h2', 'Market Trends').should('be.visible')
        cy.get('h2').should('have.class', 'text-2xl')
        cy.get('h2').should('have.class', 'font-semibold')

        cy.contains('Average property prices per square meter (MXN)').should('be.visible')
        cy.get('p').should('have.class', 'text-sm')
        cy.get('p').should('have.class', 'text-gray-500')

        // Dropdown con valor por defecto
        cy.contains('Last 12 months').should('be.visible')
        cy.get('button').should('have.class', 'flex')
        cy.get('button').should('have.class', 'items-center')
        cy.get('button').should('have.class', 'gap-2')
        cy.get('button').should('have.class', 'px-4')
        cy.get('button').should('have.class', 'py-2')

        // Icono ChevronDown
        cy.get('.h-4.w-4').should('be.visible')

        // Área del gráfico
        cy.get('.h-64').should('be.visible')
        cy.get('canvas').should('be.visible')

        // Verificar que existe el área para MarketTrendsInputs
        cy.get('.w-full.max-w-md.p-4.shadow-xl.rounded-xl.bg-white').within(() => {
          cy.get('div').should('have.length.greaterThan', 2)
        })

        cy.log('✅ Estructura completa del componente verificada correctamente')
      })

    })

    describe('❌ CASOS FALLIDOS ESTÁTICOS', () => {
      it('Debe manejar correctamente estados de interfaz cuando elementos no están disponibles', () => {
        cy.visit('/platform/dashboard')

        // VERIFICAR MANEJO DE ESTADOS PROBLEMÁTICOS
        // Verificar que el componente existe antes de hacer pruebas de fallos
        cy.contains('Market Trends').should('be.visible')

        // Intentar hacer click en elementos que no deberían existir inicialmente
        // El dropdown debería estar cerrado, así que estas opciones no deberían ser clickeables
        cy.get('body').then(($body) => {
          // Verificar que las opciones del dropdown no están visibles inicialmente
          const dropdownOptions = $body.find('.absolute.right-0.mt-2')
          expect(dropdownOptions).to.have.length(0)
        })

        // Verificar que hacer click fuera del dropdown cuando está cerrado no causa errores
        cy.get('body').click(100, 100)
        cy.contains('Market Trends').should('still.be.visible')

        // Abrir y cerrar dropdown múltiples veces rápidamente
        cy.get('button').contains('Last 12 months').click()
        cy.get('button').contains('Last 12 months').click() // Cerrar
        cy.get('button').contains('Last 12 months').click() // Abrir
        cy.get('button').contains('Last 12 months').click() // Cerrar

        // Verificar que el componente sigue funcionando después de clicks rápidos
        cy.contains('Market Trends').should('be.visible')
        cy.get('canvas').should('be.visible')

        // Verificar que no hay elementos rotos o duplicados
        cy.get('.w-full.max-w-md.p-4.shadow-xl.rounded-xl.bg-white').should('have.length', 1)
        cy.get('h2').contains('Market Trends').should('have.length', 1)

        cy.log('✅ Manejo de estados problemáticos de interfaz verificado')
      })

    })
  })
})