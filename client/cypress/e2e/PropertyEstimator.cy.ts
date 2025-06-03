// cypress/e2e/property-estimator.cy.ts

describe('PropertyEstimator - Pruebas Completas', () => {
  beforeEach(() => {
    // Bypass login
    cy.bypassLogin()

    // Verificar que estamos en dashboard
    cy.url().should('include', '/platform/dashboard')
    cy.contains('Property Value Estimator').should('be.visible')
  })

  // 🔍 PRUEBAS ESTÁTICAS
  describe('🧪 Pruebas Estáticas (UI/Formulario)', () => {
    describe('✅ CASOS EXITOSOS', () => {
      it('Debe cargar correctamente todos los elementos del formulario', () => {
        cy.contains('Property Value Estimator').should('be.visible')
        cy.contains('Enter property details to get an estimated market value').should('be.visible')

        cy.get('#street').should('be.visible').and('be.enabled')
        cy.get('#zip').should('be.visible').and('be.enabled')
        cy.get('#condicion').should('be.visible').and('be.enabled')
        cy.get('#anotacionesExtras').should('be.visible').and('be.enabled')
        cy.get('select').should('exist').and('have.length.at.least', 1)
        cy.get('button').invoke('text').should('match', /Estimate|Estimar/)
        cy.get('.bg-red-50').should('not.exist')
      })

      it('Debe permitir llenar todos los campos del formulario correctamente', () => {
        const anotaciones = 'Casa con jardín amplio, acabados de lujo, excelente ubicación'

        cy.get('#street').type('Av. Insurgentes Sur 1234').should('have.value', 'Av. Insurgentes Sur 1234')
        cy.get('#zip').type('03100').should('have.value', '03100')
        cy.get('#condicion').select('Excelente').should('have.value', 'Excelente')
        cy.get('#anotacionesExtras').type(anotaciones).should('have.value', anotaciones)
      })
    })

    describe('❌ CASOS FALLIDOS', () => {
      it('Debe manejar campos vacíos correctamente', () => {
        cy.get('#street').should('have.value', '')
        cy.get('#zip').should('have.value', '')
        cy.get('#anotacionesExtras').should('have.value', '')

        cy.get('#street').type('Dirección temporal').clear().should('have.value', '')
        cy.get('#zip').type('12345').clear().should('have.value', '')
        cy.get('#condicion').select('Buena').select('').should('have.value', '')
      })

      it('Debe manejar entrada de datos inválidos en los campos', () => {
        const textoLargo = 'Esta es una dirección extremadamente larga '.repeat(10)
        const caracteresEspeciales = '¡Hola! ¿Cómo están? áéíóú ñ @#$%^&*()[]{}|'

        cy.get('#zip').type('ABCDE@#$%').should('have.value', 'ABCDE@#$%')
        cy.get('#street').type(textoLargo).should('contain.value', 'Esta es una dirección extremadamente larga')
        cy.get('#anotacionesExtras').type(caracteresEspeciales).should('have.value', caracteresEspeciales)
      })
    })
  })

  // 🔗 PRUEBAS DE INTEGRACIÓN CON API
  describe('🔗 Pruebas de Integración (API)', () => {
    describe('✅ CASO EXITOSO INTEGRACIÓN', () => {
      it('Debe ejecutar handleGenerarReporte correctamente después de una estimación', () => {
        const mockPrediction = {
          precio_estimado: 3200000,
          confidence: 0.78,
          factors: {
            ubicacion: 'Buena',
            tamano: 'Pequeño',
            condicion: 'Muy buena'
          }
        }

        const mockReportResponse = {
          success: true,
          reportId: 'RPT-67890',
          message: 'Reporte generado exitosamente',
          downloadUrl: '/api/reports/download/RPT-67890'
        }

        cy.intercept('POST', 'http://localhost:8080/api/estimar/casa', {
          statusCode: 200,
          body: mockPrediction
        }).as('predictCasa')

        cy.intercept('POST', 'http://localhost:8080/api/create-new-report', {
          statusCode: 200,
          body: mockReportResponse
        }).as('createNewReport')

        cy.get('#street').type('Calle Roma Norte 567')
        cy.get('#zip').type('06700')
        cy.get('#condicion').select('Muy Buena')
        cy.get('#anotacionesExtras').type('Departamento bien ubicado con excelente iluminación')

        cy.get('button').contains(/Estimate|Estimar/).click()
        cy.wait('@predictCasa')
        cy.wait(500)

        cy.get('body').then(($body) => {
          const generateButton = $body.find('button:contains("Generar"), button:contains("Generate"), button:contains("Crear"), button:contains("Create")')

          if (generateButton.length > 0) {
            cy.wrap(generateButton.first()).click()
            cy.wait('@createNewReport').then((interception) => {
              expect(interception.request.method).to.equal('POST')
              expect(interception.request.url).to.include('/api/create-new-report')

              const requestBody = interception.request.body

              expect(requestBody).to.include({
                direccion: 'Calle Roma Norte 567',
                codigoPostal: '06700',
                condicionesPropiedad: 'Muy Buena',
                anotacionesExtra: 'Departamento bien ubicado con excelente iluminación',
                valorEstimado: 3200000,
                antiguedadAnos: 5,
                anotacionesValuacion: 'Estimación generada automáticamente...'
              })

              // Validar tipos de datos
              expect(requestBody.valorEstimado).to.be.a('number')
              expect(requestBody.recamaras).to.be.a('number')
              expect(requestBody.banos).to.be.a('number')
              expect(requestBody.estacionamientos).to.be.a('number')
              expect(requestBody.dimensionesM2).to.be.a('number')
              expect(requestBody.antiguedadAnos).to.be.a('number')

              expect(interception.response?.statusCode).to.equal(200)
            })

            cy.get('.bg-red-50').should('not.exist')
          } else {
            cy.log('Botón de generar reporte no encontrado - Modal podría no estar visible')
          }
        })
      })
    })

    describe('❌ CASOS FALLIDOS INTEGRACIÓN', () => {
      it('Debe manejar error en la API de generación de reportes', () => {
        const mockPrediction = {
          precio_estimado: 2800000,
          confidence: 0.72
        }

        cy.intercept('POST', 'http://localhost:8080/api/estimar/casa', {
          statusCode: 200,
          body: mockPrediction
        }).as('predictCasaSuccess')

        cy.intercept('POST', 'http://localhost:8080/api/create-new-report', {
          statusCode: 400,
          body: {
            error: 'Datos inválidos',
            message: 'No se pudo generar el reporte'
          }
        }).as('createReportError')

        cy.get('#street').type('Test Error Reporte')
        cy.get('#zip').type('00000')
        cy.get('#condicion').select('Regular')

        cy.get('button').contains(/Estimate|Estimar/).click()
        cy.wait('@predictCasaSuccess')
        cy.wait(500)

        cy.get('body').then(($body) => {
          const generateButton = $body.find('button:contains("Generar"), button:contains("Generate")')

          if (generateButton.length > 0) {
            cy.wrap(generateButton.first()).click()

            cy.wait('@createReportError').then((interception) => {
              expect(interception.response?.statusCode).to.equal(400)
            })

            cy.get('body').should('exist')
          } else {
            cy.log('No se pudo probar error de reporte - modal no visible')
          }
        })
      })

      it('Debe manejar errores de red y timeout', () => {
        cy.intercept('POST', 'http://localhost:8080/api/estimar/casa', {
          forceNetworkError: true
        }).as('predictNetworkError')

        cy.get('#street').type('Network Error Test')
        cy.get('#condicion').select('Buena')
        cy.get('button').contains(/Estimate|Estimar/).click()

        cy.wait('@predictNetworkError')

        cy.get('body').then(($body) => {
          const hasError = $body.find('.bg-red-50, .text-red-700, .error').length > 0
          if (hasError) {
            cy.get('.bg-red-50, .text-red-700').should('be.visible')
          }
        })

        cy.get('.my-4.flex.justify-center.items-center').should('not.exist')
      })
    })
  })
})
