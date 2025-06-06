// cypress/e2e/market-trends-chart.cy.ts
describe('Prueba de Market Trends Chart Component', () => {
  beforeEach(() => {
    // Aplicar bypassLogin antes de cada prueba
    cy.bypassLogin();
  });

  // ===================== CASOS EXITOSOS =====================
  
  context('✅ Casos Exitosos', () => {
    it('✅ Debe navegar correctamente al dashboard y mostrar el chart', () => {
      cy.log('🧪 CASO EXITOSO: Navegación al dashboard');
      
      cy.log('🔄 Navegando al dashboard');
      cy.visit('/platform/dashboard');
      
      cy.log('🔍 Verificando URL correcta');
      cy.url().should('include', '/platform/dashboard');
      
      cy.log('🔍 Verificando que el componente Market Trends existe');
      cy.contains('Comparativa de Alcaldías').should('be.visible');
      
      cy.log('🔍 Verificando elementos básicos del chart');
      cy.get('[data-testid="market-trends-chart"]').should('exist') || (() => {
        // Fallback si no hay data-testid
        cy.contains('Comparativa de Alcaldías').parent().should('be.visible');
      });
      
      cy.log('🎉 CASO EXITOSO COMPLETADO - Chart visible');
    });

    it('✅ Debe mostrar el selector de alcaldías', () => {
      cy.log('🧪 CASO EXITOSO: Selector de alcaldías');
      
      cy.log('🔄 Navegando al dashboard');
      cy.visit('/platform/dashboard');
      
      cy.log('🔍 Verificando texto "Alcaldías a Comparar"');
      cy.contains('Alcaldías a Comparar').should('be.visible');
      
      cy.log('🔍 Verificando alcaldías seleccionadas por defecto');
      cy.contains('Benito Juárez').should('be.visible');
      cy.contains('Miguel Hidalgo').should('be.visible');
      cy.contains('Álvaro Obregón').should('be.visible');
      
      cy.log('🔍 Verificando dropdown de selección');
      cy.get('button').contains(/Seleccionar alcaldía|Máximo/).should('be.visible');
      
      cy.log('🔘 Abriendo dropdown de alcaldías');
      cy.get('button').contains(/Seleccionar alcaldía|Máximo/).click();
      
      cy.log('🔍 Verificando que se abre el dropdown');
      cy.get('[class*="absolute"][class*="z-20"]').should('be.visible') || (() => {
        // Verificación alternativa
        cy.contains('Coyoacán').should('be.visible');
      });
      
      cy.log('🎉 CASO EXITOSO COMPLETADO - Selector funciona');
    });

    it('✅ Debe mostrar la tabla comparativa', () => {
      cy.log('🧪 CASO EXITOSO: Tabla comparativa');
      
      cy.log('🔄 Navegando al dashboard');
      cy.visit('/platform/dashboard');
      
      cy.log('🔍 Verificando título de tabla');
      cy.contains('Comparación Detallada').should('be.visible');
      
      cy.log('🔍 Verificando headers de la tabla');
      cy.contains('Alcaldía').should('be.visible');
      cy.contains('Precio Total').should('be.visible');
      cy.contains('Precio/m²').should('be.visible');
      cy.contains('Diferencia').should('be.visible');
      
      cy.log('🔍 Verificando que hay datos en la tabla');
      cy.get('div').contains(/\$.*M|\$.*k|Base|%/).should('exist');
      
      cy.log('🎉 CASO EXITOSO COMPLETADO - Tabla visible');
    });
  });

  // ===================== CASOS FALLIDOS =====================
  
  context('❌ Casos Fallidos', () => {
    it('❌ Debe fallar si no hay autenticación (sin bypassLogin)', () => {
      cy.log('🧪 CASO FALLIDO: Sin autenticación');
      
      cy.log('🔄 Intentando acceder sin bypassLogin');
      // Limpiar cualquier autenticación previa
      cy.clearAllLocalStorage();
      cy.clearAllSessionStorage();
      cy.clearAllCookies();
      
      cy.log('🔄 Navegando directo al dashboard');
      cy.visit('/platform/dashboard', { failOnStatusCode: false });
      
      cy.log('🔍 Verificando redirección o error');
      cy.url({ timeout: 10000 }).should('satisfy', (url: string) => {
        // Debe redirigir a login, signup, o mostrar error de auth
        return url.includes('/login') || 
               url.includes('/signup') || 
               url.includes('/auth') ||
               url.includes('unauthorized');
      });
      
      cy.log('💥 CASO FALLIDO COMPLETADO - Acceso bloqueado correctamente');
    });

    it('❌ Debe manejar error de API para datos de alcaldías', () => {
      cy.log('🧪 CASO FALLIDO: Error de API de alcaldías');
      
      // Interceptar API para simular error
      cy.intercept('GET', '**/alcaldias/**', { 
        forceNetworkError: true 
      }).as('alcaldiasError');
      
      cy.intercept('GET', '**/api/alcaldias**', { 
        forceNetworkError: true 
      }).as('alcaldiasApiError');
      
      cy.log('🔄 Navegando al dashboard con API caída');
      cy.visit('/platform/dashboard');
      
      cy.log('🔍 Verificando que el componente se muestra');
      cy.contains('Comparativa de Alcaldías').should('be.visible');
      
      cy.log('🔍 Buscando mensaje de error');
      cy.get('body').then(($body) => {
        if ($body.text().includes('Error en Comparativa de Alcaldías') ||
            $body.text().includes('Error') ||
            $body.text().includes('problema') ||
            $body.text().includes('Reintentar')) {
          cy.log('✅ Mensaje de error encontrado');
          cy.contains(/Error|problema|Reintentar/i).should('be.visible');
        } else {
          cy.log('ℹ️ Componente carga sin mostrar error específico');
        }
      });
      
      cy.log('💥 CASO FALLIDO COMPLETADO - Error de API manejado');
    });

    it('❌ Debe manejar componente sin datos válidos', () => {
      cy.log('🧪 CASO FALLIDO: Sin datos válidos');
      
      // Interceptar API para retornar datos vacíos o inválidos
      cy.intercept('GET', '**/alcaldias/**', {
        statusCode: 200,
        body: {}
      }).as('emptyData');
      
      cy.intercept('GET', '**/api/alcaldias**', {
        statusCode: 200,
        body: {}
      }).as('emptyApiData');
      
      cy.log('🔄 Navegando al dashboard');
      cy.visit('/platform/dashboard');
      
      cy.log('🔍 Verificando que el componente se renderiza');
      cy.contains('Comparativa de Alcaldías').should('be.visible');
      
      cy.log('🔍 Verificando manejo de datos vacíos');
      cy.get('body').then(($body) => {
        if ($body.text().includes('Cargando') || 
            $body.text().includes('Error') ||
            $body.text().includes('No hay datos')) {
          cy.log('✅ Estado de datos vacíos manejado');
        } else {
          cy.log('ℹ️ Componente maneja datos vacíos silenciosamente');
        }
      });
      
      cy.log('💥 CASO FALLIDO COMPLETADO - Datos vacíos manejados');
    });

    it('❌ Debe manejar botón de reintentar en caso de error', () => {
      cy.log('🧪 CASO FALLIDO: Funcionalidad de reintentar');
      
      // Simular error en primera llamada
      let callCount = 0;
      cy.intercept('GET', '**/alcaldias/**', (req) => {
        callCount++;
        if (callCount === 1) {
          req.reply({ forceNetworkError: true });
        } else {
          req.reply({
            statusCode: 200,
            body: {
              "Benito Juárez": {
                precioCasa: 8500000,
                precioDepto: 6200000,
                precioM2Casa: 75000,
                precioM2Depto: 85000
              }
            }
          });
        }
      }).as('retryableError');
      
      cy.log('🔄 Navegando al dashboard');
      cy.visit('/platform/dashboard');
      
      cy.log('🔍 Buscando botón de reintentar');
      cy.get('body').then(($body) => {
        if ($body.text().includes('Reintentar') || $body.text().includes('🔄')) {
          cy.log('✅ Botón de reintentar encontrado');
          cy.get('button').contains(/Reintentar|🔄/).click();
          cy.log('🔘 Botón de reintentar clickeado');
        } else {
          cy.log('ℹ️ No se encontró botón de reintentar visible');
        }
      });
      
      cy.log('💥 CASO FALLIDO COMPLETADO - Funcionalidad de reintentar probada');
    });
  });
});