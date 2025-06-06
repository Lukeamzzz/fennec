// cypress/e2e/property-estimator.cy.ts

describe('PropertyEstimator - Pruebas Completas', () => {
  beforeEach(() => {
    // Bypass login
    cy.bypassLogin()

    // Navegar al dashboard
    cy.visit('/platform/dashboard')

    // Verificar que estamos en dashboard y el componente está visible
    cy.url().should('include', '/platform/dashboard')
    cy.get('[data-testid="property-estimator"]').should('be.visible')
  })

  // 🔍 PRUEBAS ESTÁTICAS
  describe('🧪 Pruebas Estáticas (UI/Formulario)', () => {
    describe('✅ CASOS EXITOSOS', () => {
      it('✅ Debe cargar correctamente todos los elementos del formulario', () => {
        cy.log('🧪 CASO EXITOSO: Elementos del formulario')

        // Verificar contenedor principal
        cy.get('[data-testid="property-estimator"]').should('be.visible')

        // Verificar título y descripción
        cy.get('[data-testid="estimator-title"]').should('contain.text', 'Property Value Estimator')
        cy.get('[data-testid="estimator-description"]').should('contain.text', 'Enter property details to get an estimated market value')

        // Verificar campos específicos
        cy.get('[data-testid="input-street"]').should('be.visible').and('be.enabled')
        cy.get('[data-testid="input-zip"]').should('be.visible').and('be.enabled')
        cy.get('[data-testid="select-condicion"]').should('be.visible').and('be.enabled')
        cy.get('[data-testid="textarea-anotaciones"]').should('be.visible').and('be.enabled')

        // Verificar contenedores de componentes
        cy.get('[data-testid="alcaldia-dropdown-container"]').should('be.visible')
        cy.get('[data-testid="group-dropdowns-container"]').should('be.visible')
        cy.get('[data-testid="size-slider-container"]').should('be.visible')
        cy.get('[data-testid="estimate-button-container"]').should('be.visible')

        // Verificar que no hay errores iniciales
        cy.get('[data-testid="error-message"]').should('not.exist')

        cy.log('🎉 CASO EXITOSO COMPLETADO - Todos los elementos presentes')
      })

      it('✅ Debe mostrar todos los controles específicos del PropertyEstimator', () => {
        cy.log('🧪 CASO EXITOSO: Controles específicos')

        // Verificar AlcaldiaDropdown
        cy.get('[data-testid="alcaldia-dropdown-container"]').within(() => {
          cy.get('select, button, [role="combobox"]').should('exist')
        })

        // Verificar GroupDropdowns 
        cy.get('[data-testid="group-dropdowns-container"]').within(() => {
          cy.get('select, button, input').should('exist')
        })

        // Verificar SizeSlider
        cy.get('[data-testid="size-slider-container"]').within(() => {
          cy.get('input, [role="slider"]').should('exist')
        })

        // Verificar botón de estimación
        cy.get('[data-testid="estimate-button-container"]').within(() => {
          cy.get('button').should('be.visible').and('be.enabled')
        })

        cy.log('🎉 CASO EXITOSO COMPLETADO - Controles específicos verificados')
      })
    })
  })


  // 🎛️ PRUEBAS DE COMPONENTES ESPECÍFICOS
  describe('🎛️ Pruebas de Componentes Específicos', () => {
    it('🎛️ Debe permitir interactuar con AlcaldiaDropdown', () => {
      cy.log('🧪 COMPONENTE: AlcaldiaDropdown')

      cy.get('[data-testid="alcaldia-dropdown-container"]').within(() => {
        // Buscar el dropdown y verificar que sea interactivo
        cy.get('select, button, [role="combobox"]').then(($elements) => {
          if ($elements.is('select')) {
            // Si es un select nativo
            cy.wrap($elements).should('be.enabled')
          } else {
            // Si es un dropdown personalizado
            cy.wrap($elements).should('be.visible').and('not.be.disabled')
          }
        })
      })

      cy.log('✅ AlcaldiaDropdown verificado')
    })

    it('🎛️ Debe permitir interactuar con GroupDropdowns', () => {
      cy.log('🧪 COMPONENTE: GroupDropdowns')

      cy.get('[data-testid="group-dropdowns-container"]').within(() => {
        // Verificar que hay elementos interactivos
        cy.get('select, button, input').should('exist').and('have.length.at.least', 1)
      })

      cy.log('✅ GroupDropdowns verificado')
    })

    it('🎛️ Debe permitir interactuar con SizeSlider', () => {
      cy.log('🧪 COMPONENTE: SizeSlider')

      cy.get('[data-testid="size-slider-container"]').within(() => {
        // Buscar input de rango o slider
        cy.get('input[type="range"], input[type="number"], [role="slider"]').then(($elements) => {
          if ($elements.length > 0) {
            cy.wrap($elements.first()).should('be.enabled')

            // Si es input type="range", probar cambiar valor
            if ($elements.first().is('input[type="range"]')) {
              cy.wrap($elements.first()).invoke('val', 200).trigger('input')
            }
          }
        })
      })

      cy.log('✅ SizeSlider verificado')
    })

  })
})
