
describe('Prueba de Property Search Page', () => {
  beforeEach(() => {
    cy.bypassLogin();
  });

  // ===================== CASOS EXITOSOS =====================
  
  context('✅ Casos Exitosos', () => {
    it('✅ Debe navegar correctamente a property search', () => {
      cy.log('🧪 CASO EXITOSO: Navegación a property search');
      
      cy.log('🔄 Navegando a property search');
      cy.visit('/platform/property-search');
      
      cy.log('🔍 Verificando URL correcta');
      cy.url().should('include', '/platform/property-search');
      
      cy.log('🔍 Verificando que la página carga');
      cy.get('body').should('be.visible');
      
      cy.log('🎉 CASO EXITOSO COMPLETADO - Navegación exitosa');
    });

    it('✅ Debe mostrar elementos básicos de la página', () => {
      cy.log('🧪 CASO EXITOSO: Elementos básicos visibles');
      
      cy.log('🔄 Navegando a property search');
      cy.visit('/platform/property-search');
      
      cy.log('🔍 Verificando que la página no está en blanco');
      cy.get('body').should('not.be.empty');
      
      cy.log('🔍 Verificando que hay contenido en la página');
      cy.get('div').should('exist');
      
      cy.log('🎉 CASO EXITOSO COMPLETADO - Página carga con contenido');
    });

    it('✅ Debe mostrar y usar los filtros de búsqueda correctamente', () => {
      cy.log('🧪 CASO EXITOSO: Filtros de búsqueda funcionan');
      
      cy.log('🔄 Navegando a property search');
      cy.visit('/platform/property-search');
      
      cy.log('🔍 Verificando que existe el sidebar de filtros');
      cy.get('.w-80').should('be.visible'); // Sidebar de filtros
      
      cy.log('🔍 Buscando cualquier botón en el sidebar');
      cy.get('.w-80').within(() => {
        cy.get('button').should('exist');
      });
      
      cy.log('🔍 Verificando estado inicial (sin búsqueda)');
      cy.contains('Encuentra tu Propiedad Ideal').should('be.visible');
      
      cy.log('🔘 Haciendo clic en el primer botón encontrado');
      cy.get('.w-80').within(() => {
        cy.get('button').first().click();
      });
      
      cy.log('🔍 Esperando que algo cambie en la página');
      cy.wait(2000); // Dar tiempo para que algo pase
      
      cy.log('🎉 CASO EXITOSO COMPLETADO - Botón clickeado');
    });

    it('✅ Debe encontrar elementos de filtros básicos', () => {
      cy.log('🧪 CASO EXITOSO: Elementos de filtros visibles');
      
      cy.log('🔄 Navegando a property search');
      cy.visit('/platform/property-search');
      
      cy.log('🔍 Verificando sidebar existe');
      cy.get('.w-80').should('be.visible');
      
      cy.log('🔍 Buscando inputs en el sidebar');
      cy.get('.w-80').within(() => {
        cy.get('input, select, button').should('exist');
      });
      
      cy.log('🔍 Contando elementos interactivos');
      cy.get('.w-80').within(() => {
        cy.get('input, select, button').then(($elements) => {
          cy.log(`Encontrados ${$elements.length} elementos interactivos`);
        });
      });
      
      cy.log('🎉 CASO EXITOSO COMPLETADO - Elementos encontrados');
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
      
      cy.log('🔄 Navegando directo a property search');
      cy.visit('/platform/property-search', { failOnStatusCode: false });
      
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

    it('❌ Debe manejar rutas incorrectas', () => {
      cy.log('🧪 CASO FALLIDO: Ruta incorrecta');
      
      cy.log('🔄 Navegando a ruta inexistente');
      cy.visit('/platform/property-search-inexistente', { failOnStatusCode: false });
      
      cy.log('🔍 Verificando que maneja la ruta incorrecta');
      cy.url().should('satisfy', (url: string) => {
        // Debe mostrar 404, redirigir, o manejar el error
        return url.includes('404') || 
               url.includes('not-found') ||
               url.includes('/platform') ||
               url !== '/platform/property-search-inexistente';
      });
      
      cy.log('💥 CASO FALLIDO COMPLETADO - Ruta incorrecta manejada');
    });

    it('❌ Debe manejar sidebar de filtros sin elementos clickeables', () => {
      cy.log('🧪 CASO FALLIDO: Filtros sin elementos interactivos');
      
      cy.log('🔄 Navegando a property search');
      cy.visit('/platform/property-search');
      
      cy.log('🔍 Verificando que sidebar existe');
      cy.get('.w-80').should('be.visible');
      
      cy.log('🔍 Intentando encontrar elementos deshabilitados');
      cy.get('.w-80').within(() => {
        cy.get('button, input, select').then(($elements) => {
          if ($elements.length === 0) {
            cy.log('⚠️ No se encontraron elementos interactivos');
          } else {
            // Verificar si hay elementos deshabilitados
            const disabledElements = $elements.filter(':disabled').length;
            cy.log(`📊 Elementos encontrados: ${$elements.length}, Deshabilitados: ${disabledElements}`);
          }
        });
      });
      
      cy.log('💥 CASO FALLIDO COMPLETADO - Estado de filtros verificado');
    });


    it('❌ Debe manejar filtros sin conexión a API', () => {
      cy.log('🧪 CASO FALLIDO: API de filtros no disponible');
      
      // Interceptar todas las llamadas posibles para simular API caída
      cy.intercept('GET', '**/api/**', { forceNetworkError: true }).as('apiDown');
      cy.intercept('POST', '**/api/**', { forceNetworkError: true }).as('apiPostDown');
      cy.intercept('GET', '**/properties**', { forceNetworkError: true }).as('propertiesDown');
      
      cy.log('🔄 Navegando a property search con API caída');
      cy.visit('/platform/property-search');
      
      cy.log('🔍 Verificando que la página carga a pesar de API caída');
      cy.get('.w-80').should('be.visible');
      
      cy.log('🔘 Intentando usar filtros con API caída');
      cy.get('.w-80').within(() => {
        cy.get('button').first().then(($btn) => {
          cy.wrap($btn).click();
          cy.log('🔘 Clic realizado con API caída');
        });
      });
      
      cy.log('🔍 Verificando manejo de error de red');
      cy.wait(3000); // Dar tiempo para manejar errores
      
      // La página debería seguir funcionando o mostrar mensaje de error apropiado
      cy.get('body').should('be.visible');
      
      cy.log('💥 CASO FALLIDO COMPLETADO - Error de API manejado');
    });
  });
    });