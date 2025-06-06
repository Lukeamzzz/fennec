// cypress/e2e/signup.cy.ts
describe('Prueba de Formulario de Registro', () => {
  beforeEach(() => {
    // Visitar la página de signup antes de cada prueba
    cy.visit('/signup');
  });

  // ===================== CASOS EXITOSOS =====================
  
  context('✅ Casos Exitosos', () => {
    it('✅ Debe llenar todos los campos correctamente', () => {
      cy.log('🧪 CASO EXITOSO: Completar formulario con datos válidos');
      
      const testUser = {
        nombre: 'Juan Pérez',
        email: 'juan.perez@example.com',
        telefono: '5512345678',
        password: 'TestPassword123!',
        confirmPassword: 'TestPassword123!'
      };

      cy.log('📝 Llenando campo: Nombre');
      cy.get('input[name="nombre"]')
        .type(testUser.nombre)
        .should('have.value', testUser.nombre);

      cy.log('📝 Llenando campo: Email');
      cy.get('input[name="email"]')
        .type(testUser.email)
        .should('have.value', testUser.email);

      cy.log('📝 Llenando campo: Teléfono');
      cy.get('input[name="telefono"]')
        .type(testUser.telefono)
        .should('have.value', testUser.telefono);

      cy.log('📝 Llenando campo: Password');
      cy.get('input[name="password"]')
        .type(testUser.password)
        .should('have.value', testUser.password);

      cy.log('📝 Llenando campo: Confirm Password');
      cy.get('input[name="confirmPassword"]')
        .type(testUser.confirmPassword)
        .should('have.value', testUser.confirmPassword);

      cy.log('✅ Verificando que todos los campos tienen valores');
      cy.get('input[name="nombre"]').should('not.have.value', '');
      cy.get('input[name="email"]').should('not.have.value', '');
      cy.get('input[name="telefono"]').should('not.have.value', '');
      cy.get('input[name="password"]').should('not.have.value', '');
      cy.get('input[name="confirmPassword"]').should('not.have.value', '');
      
      cy.log('🎉 CASO EXITOSO COMPLETADO');
    });

    it('✅ Debe aceptar emails con diferentes dominios válidos', () => {
      cy.log('🧪 CASO EXITOSO: Validación de emails válidos');
      
      const emailsValidos = [
        'usuario@gmail.com',
        'test.email@hotmail.com',
        'admin@empresa.com.mx'
      ];

      emailsValidos.forEach((emailValido, index) => {
        cy.log(`📧 Probando email ${index + 1}: ${emailValido}`);
        cy.get('input[name="email"]').clear().type(emailValido);
        
        cy.get('input[name="email"]').then(($input) => {
          const input = $input[0] as HTMLInputElement;
          expect(input.validity.valid).to.be.true;
        });
        
        cy.log(`✅ Email válido: ${emailValido}`);
      });
      
      cy.log('🎉 CASO EXITOSO COMPLETADO');
    });
  });

  // ===================== CASOS FALLIDOS =====================
  
  context('❌ Casos Fallidos', () => {
    it('❌ Debe mostrar error cuando las contraseñas no coinciden', () => {
      cy.log('🧪 CASO FALLIDO: Contraseñas diferentes');
      
      const testUser = {
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        telefono: '5512345678',
        password: 'TestPassword123!',
        confirmPassword: 'DiferentePassword123!'
      };

      cy.log('📝 Llenando formulario con contraseñas diferentes');
      cy.get('input[name="nombre"]').type(testUser.nombre);
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="telefono"]').type(testUser.telefono);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('input[name="confirmPassword"]').type(testUser.confirmPassword);

      cy.log('🔘 Enviando formulario');
      cy.get('button[type="submit"]').click();

      cy.log('🔍 Verificando mensaje de error');
      cy.contains('Passwords do not match').should('be.visible');
      
      cy.log('🔍 Verificando que permanecemos en signup');
      cy.url().should('include', '/signup');
      
      cy.log('💥 CASO FALLIDO COMPLETADO - Error detectado correctamente');
    });

    it('❌ Debe mostrar error cuando el nombre está vacío', () => {
      cy.log('🧪 CASO FALLIDO: Campo nombre vacío');
      
      const testUser = {
        email: 'test@example.com',
        telefono: '5512345678',
        password: 'TestPassword123!',
        confirmPassword: 'TestPassword123!'
      };

      cy.log('📝 Llenando todos los campos excepto nombre');
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="telefono"]').type(testUser.telefono);
      cy.get('input[name="password"]').type(testUser.password);
      cy.get('input[name="confirmPassword"]').type(testUser.confirmPassword);

      cy.log('🔍 Verificando que nombre está vacío');
      cy.get('input[name="nombre"]').should('have.value', '');

      cy.log('🔘 Enviando formulario');
      cy.get('button[type="submit"]').click();

      cy.log('🔍 Buscando mensaje de error o validación HTML5');
      // Primero intentar encontrar el mensaje personalizado
      cy.get('body').then(($body) => {
        if ($body.text().includes('Name is required')) {
          cy.contains('Name is required').should('be.visible');
        } else {
          // Si no hay mensaje personalizado, verificar validación HTML5
          cy.get('input[name="nombre"]:invalid').should('exist');
          cy.log('⚠️ Validación HTML5 detectada en campo nombre');
        }
      });
      
      cy.log('🔍 Verificando que permanecemos en signup');
      cy.url().should('include', '/signup');
      
      cy.log('💥 CASO FALLIDO COMPLETADO - Error detectado correctamente');
    });
  });
});