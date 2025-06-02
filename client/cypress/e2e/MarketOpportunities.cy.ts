// cypress/e2e/market-opportunities.cy.ts
describe('MarketOpportunities Tests - Estáticos', () => {
  beforeEach(() => {
    // Bypass login
    cy.bypassLogin()
    
    // Verificar que estamos en dashboard
    cy.url().should('include', '/platform/dashboard')
    
    // Esperar a que la página cargue
    cy.wait(1000)
  })

  describe('✅ CASOS EXITOSOS', () => {
    it('Debe cargar correctamente la estructura del componente', () => {
      // Verificar título principal
      cy.contains('Oportunidades de Mercado').should('be.visible')
      
      // Verificar descripción
      cy.contains('Proyectos de inversión con alto potencial de retorno').should('be.visible')
      
      // Verificar contenedor principal
      cy.get('.bg-white.rounded-2xl.shadow').should('exist')
      
      // Verificar estructura de padding y layout
      cy.get('.flex.flex-col.gap-4.p-10').should('exist')
      
      // Verificar que tiene el contenedor de categorías
      cy.get('.flex.gap-2.mb-6').should('exist')
    })

    it('Debe mostrar correctamente los filtros de categorías', () => {
      // Verificar que existen los 3 botones de categoría
      cy.contains('button', 'Todos').should('be.visible').and('be.enabled')
      cy.contains('button', 'Casas').should('be.visible').and('be.enabled')
      cy.contains('button', 'Departamentos').should('be.visible').and('be.enabled')
      
      // Verificar que "Todos" está seleccionado por defecto
      cy.contains('button', 'Todos').should('have.class', 'bg-gray-100')
      cy.contains('button', 'Todos').should('have.class', 'text-gray-900')
      
      // Verificar que los otros no están seleccionados
      cy.contains('button', 'Casas').should('have.class', 'bg-gray-50')
      cy.contains('button', 'Departamentos').should('have.class', 'bg-gray-50')
      
      // Verificar que todos los botones tienen las clases correctas
      cy.get('button').each(($btn) => {
        cy.wrap($btn).should('have.class', 'px-4')
        cy.wrap($btn).should('have.class', 'py-1')
        cy.wrap($btn).should('have.class', 'rounded-md')
        cy.wrap($btn).should('have.class', 'font-medium')
      })
    })
  })

  describe('❌ CASOS FALLIDOS', () => {
    it('Debe manejar estado de loading correctamente', () => {
      // Verificar elementos de loading si están presentes
      cy.get('body').then(($body) => {
        if ($body.find('.overflow-x-auto').length > 0) {
          // Verificar contenedor de scroll horizontal
          cy.get('.overflow-x-auto').should('be.visible')
          cy.get('.overflow-y-hidden').should('exist')
          
          // Verificar que tiene scrollbar styling
          cy.get('.scrollbar-thin').should('exist')
          cy.get('.scrollbar-thumb-gray-200').should('exist')
        }
      })
    })

    it('Debe manejar filtros sin datos disponibles', () => {
      // Cambiar entre filtros y verificar que no rompe la interfaz
      cy.contains('button', 'Casas').click()
      cy.contains('button', 'Casas').should('have.class', 'bg-gray-100')
      cy.contains('button', 'Todos').should('have.class', 'bg-gray-50')
      
      cy.contains('button', 'Departamentos').click()
      cy.contains('button', 'Departamentos').should('have.class', 'bg-gray-100')
      cy.contains('button', 'Casas').should('have.class', 'bg-gray-50')
      
      cy.contains('button', 'Todos').click()
      cy.contains('button', 'Todos').should('have.class', 'bg-gray-100')
      cy.contains('button', 'Departamentos').should('have.class', 'bg-gray-50')
      
      // Verificar que la interfaz permanece estable
      cy.contains('Oportunidades de Mercado').should('still.be.visible')
    })
  })

  describe('🔧 PRUEBAS DE INTERACCIÓN', () => {
    it('Debe permitir cambio de filtros correctamente', () => {
      // Verificar estado inicial
      cy.contains('button', 'Todos').should('have.class', 'bg-gray-100')
      
      // Cambiar a "Casas"
      cy.contains('button', 'Casas').click()
      cy.contains('button', 'Casas').should('have.class', 'bg-gray-100')
      cy.contains('button', 'Casas').should('have.class', 'text-gray-900')
      
      // Verificar que "Todos" ya no está seleccionado
      cy.contains('button', 'Todos').should('have.class', 'bg-gray-50')
      cy.contains('button', 'Todos').should('have.class', 'text-gray-500')
      
      // Cambiar a "Departamentos"
      cy.contains('button', 'Departamentos').click()
      cy.contains('button', 'Departamentos').should('have.class', 'bg-gray-100')
      
      // Verificar que "Casas" ya no está seleccionado
      cy.contains('button', 'Casas').should('have.class', 'bg-gray-50')
      
      // Volver a "Todos"
      cy.contains('button', 'Todos').click()
      cy.contains('button', 'Todos').should('have.class', 'bg-gray-100')
    })

    it('Debe manejar hover effects en botones', () => {
      // Probar hover en botones no seleccionados
      cy.contains('button', 'Casas').trigger('mouseover')
      cy.contains('button', 'Casas').should('have.class', 'transition-colors')
      
      cy.contains('button', 'Departamentos').trigger('mouseover')  
      cy.contains('button', 'Departamentos').should('have.class', 'transition-colors')
      
      // Probar mouseout
      cy.contains('button', 'Casas').trigger('mouseout')
      cy.contains('button', 'Departamentos').trigger('mouseout')
    })

    it('Debe mantener estructura de scroll horizontal', () => {
      // Verificar contenedor de scroll
      cy.get('.max-w-5xl.mx-auto').should('exist')
      
      // Verificar contenedor flex con scroll
      cy.get('.flex.flex-row.gap-4').should('exist')
      cy.get('.overflow-x-auto').should('exist')
      
      // Verificar propiedades de scroll snap
      cy.get('.overflow-x-auto').should('have.css', 'scroll-snap-type')
      
      // Verificar padding bottom para scrollbar
      cy.get('.pb-4').should('exist')
    })

    it('Debe verificar estructura de tarjetas si existen', () => {
      cy.get('body').then(($body) => {
        // Verificar si hay tarjetas de inversión
        if ($body.find('.bg-\\[\\#FFF9F6\\]').length > 0) {
          // Verificar tarjetas de oportunidades
          cy.get('.bg-\\[\\#FFF9F6\\]').should('have.class', 'rounded-xl')
          cy.get('.bg-\\[\\#FFF9F6\\]').should('have.class', 'flex')
          cy.get('.bg-\\[\\#FFF9F6\\]').should('have.class', 'flex-col')
          cy.get('.bg-\\[\\#FFF9F6\\]').should('have.class', 'min-h-80')
          cy.get('.bg-\\[\\#FFF9F6\\]').should('have.class', 'w-\\[400px\\]')
          cy.get('.bg-\\[\\#FFF9F6\\]').should('have.class', 'flex-shrink-0')
          
          // Verificar que las tarjetas no se rompen al hacer clic
          cy.get('.bg-\\[\\#FFF9F6\\]').first().click({ force: true })
          cy.get('.bg-\\[\\#FFF9F6\\]').first().should('still.exist')
        }
      })
    })
  })

  describe('🎨 PRUEBAS DE DISEÑO Y LAYOUT', () => {
    it('Debe tener el layout correcto del componente', () => {
      // Verificar contenedor principal
      cy.get('.drop-shadow-xl').should('exist')
      
      // Verificar sección principal
      cy.get('section.bg-white.rounded-2xl.shadow.p-6').should('exist')
      
      // Verificar header con flexbox
      cy.get('.flex.items-center.justify-between.mb-4').should('exist')
      
      // Verificar estructura de títulos
      cy.get('h2.text-2xl.font-bold.text-gray-900').should('exist')
      cy.get('p.text-gray-500.text-sm').should('exist')
    })

    it('Debe mantener responsive design', () => {
      // Probar en diferentes viewports
      cy.viewport(320, 568) // Mobile
      cy.contains('Oportunidades de Mercado').should('be.visible')
      cy.get('.flex.gap-2.mb-6').should('exist')
      
      cy.viewport(768, 1024) // Tablet  
      cy.contains('Oportunidades de Mercado').should('be.visible')
      cy.get('button').should('have.length', 3)
      
      cy.viewport(1920, 1080) // Desktop
      cy.contains('Oportunidades de Mercado').should('be.visible')
      cy.get('.max-w-5xl').should('exist')
    })

    it('Debe tener colores y estilos correctos', () => {
      // Verificar colores del botón seleccionado
      cy.contains('button', 'Todos').should('have.class', 'bg-gray-100')
      cy.contains('button', 'Todos').should('have.class', 'text-gray-900')
      
      // Verificar colores de botones no seleccionados
      cy.contains('button', 'Casas').should('have.class', 'bg-gray-50')
      cy.contains('button', 'Casas').should('have.class', 'text-gray-500')
      
      // Verificar estilos de tipografía
      cy.get('h2').should('have.class', 'text-2xl')
      cy.get('h2').should('have.class', 'font-bold')
      cy.get('h2').should('have.class', 'text-gray-900')
      
      // Verificar espaciado
      cy.get('.mb-4').should('exist')
      cy.get('.mb-6').should('exist')
      cy.get('.gap-4').should('exist')
    })

    it('Debe manejar elementos de accesibilidad', () => {
      // Verificar que los botones son accesibles
      cy.get('button').each(($btn) => {
        cy.wrap($btn).should('be.visible')
        cy.wrap($btn).should('not.be.disabled')
        cy.wrap($btn).should('have.text')
      })
      
      // Verificar estructura semántica
      cy.get('section').should('exist')
      cy.get('h2').should('exist')
      
      // Verificar que el texto es legible
      cy.get('h2').should('be.visible')
      cy.get('p').should('be.visible')
    })
  })
})