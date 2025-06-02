// cypress/e2e/property-estimator.cy.ts
describe('PropertyEstimator Tests - Estáticos', () => {
  beforeEach(() => {
    // Bypass login
    cy.bypassLogin()
    
    // Verificar que estamos en dashboard
    cy.url().should('include', '/platform/dashboard')
    cy.contains('Property Value Estimator').should('be.visible')
  })

  describe('✅ CASOS EXITOSOS', () => {
    it('Debe cargar correctamente todos los elementos del formulario', () => {
      // Verificar título y descripción
      cy.contains('Property Value Estimator').should('be.visible')
      cy.contains('Enter property details to get an estimated market value').should('be.visible')
      
      // Verificar campos de entrada existen y son interactivos
      cy.get('#street').should('be.visible').and('be.enabled')
      cy.get('#zip').should('be.visible').and('be.enabled')
      cy.get('#condicion').should('be.visible').and('be.enabled')
      cy.get('#anotacionesExtras').should('be.visible').and('be.enabled')
      
      // Verificar que hay al menos un select (alcaldía o grupo dropdowns)
      cy.get('select').should('exist').and('have.length.at.least', 1)
      
      // Verificar que el botón de estimación existe
      cy.get('button').invoke('text').should('match', /Estimate|Estimar/)
      
      // Verificar que no hay errores iniciales
      cy.get('.bg-red-50').should('not.exist')
    })

    it('Debe permitir llenar todos los campos del formulario correctamente', () => {
      // Llenar campo de dirección
      cy.get('#street').type('Av. Insurgentes Sur 1234')
      cy.get('#street').should('have.value', 'Av. Insurgentes Sur 1234')
      
      // Llenar código postal
      cy.get('#zip').type('03100')
      cy.get('#zip').should('have.value', '03100')
      
      // Seleccionar condición
      cy.get('#condicion').select('Excelente')
      cy.get('#condicion').should('have.value', 'Excelente')
      
      // Llenar anotaciones
      const anotaciones = 'Casa con jardín amplio, acabados de lujo, excelente ubicación'
      cy.get('#anotacionesExtras').type(anotaciones)
      cy.get('#anotacionesExtras').should('have.value', anotaciones)
      
      // Verificar que todos los campos mantienen sus valores
      cy.get('#street').should('have.value', 'Av. Insurgentes Sur 1234')
      cy.get('#zip').should('have.value', '03100')
      cy.get('#condicion').should('have.value', 'Excelente')
      cy.get('#anotacionesExtras').should('have.value', anotaciones)
    })
  })

  describe('❌ CASOS FALLIDOS', () => {
    it('Debe manejar campos vacíos correctamente', () => {
      // Verificar que los campos empiezan vacíos (excepto valores por defecto)
      cy.get('#street').should('have.value', '')
      cy.get('#zip').should('have.value', '')
      cy.get('#anotacionesExtras').should('have.value', '')
      
      // Intentar llenar y limpiar campos
      cy.get('#street').type('Dirección temporal')
      cy.get('#street').clear()
      cy.get('#street').should('have.value', '')
      
      cy.get('#zip').type('12345')
      cy.get('#zip').clear()
      cy.get('#zip').should('have.value', '')
      
      // Verificar que el select de condición puede resetearse
      cy.get('#condicion').select('Buena')
      cy.get('#condicion').select('') // Volver a opción vacía
      cy.get('#condicion').should('have.value', '')
    })

    it('Debe manejar entrada de datos inválidos en los campos', () => {
      // Probar código postal con caracteres inválidos
      cy.get('#zip').type('ABCDE@#$%')
      cy.get('#zip').should('have.value', 'ABCDE@#$%') // Campo acepta cualquier texto
      
      // Probar texto muy largo en dirección
      const textoLargo = 'Esta es una dirección extremadamente larga '.repeat(10)
      cy.get('#street').type(textoLargo)
      cy.get('#street').should('contain.value', 'Esta es una dirección extremadamente larga')
      
      // Probar caracteres especiales en anotaciones
      const caracteresEspeciales = '¡Hola! ¿Cómo están? áéíóú ñ @#$%^&*()[]{}|'
      cy.get('#anotacionesExtras').type(caracteresEspeciales)
      cy.get('#anotacionesExtras').should('have.value', caracteresEspeciales)
      
      // Verificar que los campos mantienen los valores (aunque sean inválidos)
      cy.get('#zip').should('have.value', 'ABCDE@#$%')
      cy.get('#anotacionesExtras').should('have.value', caracteresEspeciales)
    })
  })

  describe('🔧 PRUEBAS DE INTERACCIÓN', () => {
    it('Debe permitir cambiar valores múltiples veces', () => {
      // Cambiar dirección varias veces
      cy.get('#street').type('Primera dirección')
      cy.get('#street').should('have.value', 'Primera dirección')
      
      cy.get('#street').clear().type('Segunda dirección')
      cy.get('#street').should('have.value', 'Segunda dirección')
      
      cy.get('#street').clear().type('Dirección final')
      cy.get('#street').should('have.value', 'Dirección final')
      
      // Cambiar condición varias veces
      cy.get('#condicion').select('Excelente')
      cy.get('#condicion').should('have.value', 'Excelente')
      
      cy.get('#condicion').select('Regular')
      cy.get('#condicion').should('have.value', 'Regular')
      
      cy.get('#condicion').select('Muy Buena')
      cy.get('#condicion').should('have.value', 'Muy Buena')
    })

    it('Debe mantener foco y navegación por teclado', () => {
      // Probar navegación con Tab
      cy.get('#street').focus()
      cy.focused().should('have.id', 'street')
      
      // Escribir en campo enfocado
      cy.focused().type('Dirección con foco')
      cy.get('#street').should('have.value', 'Dirección con foco')
      
      // Mover a siguiente campo
      cy.get('#zip').focus()
      cy.focused().should('have.id', 'zip')
      cy.focused().type('12345')
      cy.get('#zip').should('have.value', '12345')
      
      // Verificar que los valores se mantienen al cambiar foco
      cy.get('#street').should('have.value', 'Dirección con foco')
      cy.get('#zip').should('have.value', '12345')
    })
  })
})
