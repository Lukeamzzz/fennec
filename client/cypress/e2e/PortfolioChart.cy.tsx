// cypress/e2e/portafolio-chart.cy.ts
describe('PortafolioChart Tests - Estáticos', () => {
  beforeEach(() => {
    // Bypass login
    cy.bypassLogin()
    
    // Verificar que estamos en dashboard
    cy.url().should('include', '/platform/dashboard')
    
    // Esperar a que la página cargue completamente
    cy.wait(1000)
  })

  describe('✅ CASOS EXITOSOS', () => {
    it('Debe mostrar estado vacío cuando no hay inversiones', () => {
      // Verificar elementos del estado vacío
      cy.contains('Comienza tu portafolio').should('be.visible')
      cy.contains('Agrega tu primera propiedad para ver el análisis').should('be.visible')
      
      // Verificar icono de edificio existe
      cy.get('svg').should('be.visible')
      
      // Verificar botón de añadir primera propiedad
      cy.contains('button', 'Añadir Primera Propiedad').should('be.visible').and('be.enabled')
      
      // Verificar que el botón tiene icono
      cy.contains('button', 'Añadir Primera Propiedad').find('svg').should('exist')
      
      // Verificar que no se muestra el gráfico cuando no hay datos
      cy.get('canvas').should('not.exist')
      cy.get('.space-y-1').should('not.exist')
    })

    it('Debe permitir interacciones básicas con botones', () => {
      // Verificar que los botones son clickeables
      cy.get('button').should('have.length.at.least', 1)
      
      // Verificar botón principal (puede ser "Añadir Primera Propiedad" o "Añadir Propiedad")
      cy.get('button').first().should('be.enabled')
      cy.get('button').first().should('not.be.disabled')
      
      // Probar hover en botón
      cy.get('button').first().trigger('mouseover')
      cy.get('button').first().trigger('mouseout')
      
      // Verificar que tiene texto
      cy.get('button').first().should('not.be.empty')
    })
  })

  describe('❌ CASOS FALLIDOS', () => {
    it('Debe manejar la ausencia de datos correctamente', () => {
      // Verificar que no hay elementos que requieren datos
      cy.get('canvas').should('not.exist')
      
      // Verificar que no hay lista de propiedades
      cy.contains('Resumen por Tipo de Propiedad').should('not.exist')
      
      // Verificar que no hay botón "Ver Todas"
      cy.contains('Ver Todas').should('not.exist')
      
      // Verificar que se muestra mensaje apropiado
      cy.contains('Comienza tu portafolio').should('be.visible')
    })

    it('Debe manejar clics en elementos no interactivos', () => {
      // Verificar que textos no son clickeables
      cy.contains('Comienza tu portafolio').should('exist')
      cy.contains('Comienza tu portafolio').click()
      
      // Verificar que el estado no cambia después de clic en texto
      cy.contains('Comienza tu portafolio').should('still.be.visible')
      
      // Verificar que iconos no rompen la interfaz al hacer clic
      cy.get('svg').first().click({ force: true })
      cy.contains('Comienza tu portafolio').should('still.be.visible')
    })
  })

  describe('🔧 PRUEBAS DE ESTRUCTURA', () => {
    it('Debe tener la estructura HTML correcta', () => {
      // Verificar contenedor principal
      cy.get('.bg-white').should('exist')
      cy.get('.rounded-xl').should('exist')
      cy.get('.shadow-sm').should('exist')
      
      // Verificar estructura de padding
      cy.get('.p-8').should('exist')
      
      // Verificar centrado de contenido
      cy.get('.text-center').should('exist')
    })

    it('Debe mantener accesibilidad básica', () => {
      // Verificar que los botones tienen texto descriptivo
      cy.get('button').each(($btn) => {
        cy.wrap($btn).should('not.be.empty')
      })
      
      // Verificar que hay elementos con texto visible
      cy.get('h3').should('be.visible')
      cy.get('p').should('be.visible')
      
      // Verificar que los SVG no están rotos
      cy.get('svg').should('be.visible')
      cy.get('svg').should('have.attr', 'class')
    })

    it('Debe tener elementos con clases CSS correctas', () => {
      // Verificar clases de Tailwind importantes
      cy.get('.bg-orange-500').should('exist')
      cy.get('.text-white').should('exist')
      cy.get('.rounded-xl').should('exist')
      
      // Verificar estructura de grid/flex si existe
      cy.get('.flex').should('exist')
      cy.get('.items-center').should('exist')
      
      // Verificar colores de estado
      cy.get('.text-gray-600').should('exist')
    })

    it('Debe manejar responsive design básico', () => {
      // Verificar en diferentes tamaños de viewport
      cy.viewport(320, 568) // Mobile
      cy.contains('Comienza tu portafolio').should('be.visible')
      cy.get('button').should('be.visible')
      
      cy.viewport(768, 1024) // Tablet
      cy.contains('Comienza tu portafolio').should('be.visible')
      cy.get('button').should('be.visible')
      
      cy.viewport(1920, 1080) // Desktop
      cy.contains('Comienza tu portafolio').should('be.visible')
      cy.get('button').should('be.visible')
    })
  })
})