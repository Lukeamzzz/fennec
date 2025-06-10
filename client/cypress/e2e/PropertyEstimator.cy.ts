describe('PropertyEstimator - Pruebas Completas', () => {
  beforeEach(() => {
  
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
