import React from 'react';
import LoginForm from './LoginForm';
import { Title, Description, Primary, Controls, Stories } from '@storybook/blocks';

export default {
  title: 'Formularios/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Formulario de Inicio de Sesión</h1>
          <p>Julián C</p>
          <p>Este componente implementa un formulario de inicio de sesión con las siguientes características:</p>
          <ul>
            <li>Campos para email y contraseña con validación</li>
            <li>Opción de "Recordar sesión"</li>
            <li>Enlace para recuperar contraseña olvidada</li>
            <li>Opción de inicio de sesión con Google</li>
            <li>Enlace para registro de nuevos usuarios</li>
            <li>Validación de campos con mensajes de error</li>
            <li>Diseño responsivo con Tailwind CSS</li>
          </ul>
          <h2>Uso</h2>
          <p>El formulario está configurado para validar los datos ingresados y mostrar mensajes de error cuando sea necesario.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import LoginForm from './LoginForm';
              
const LoginPage = () => {
  return (
    <div className="container mx-auto py-10">
      <LoginForm />
    </div>
  );
};`}
            </code>
          </pre>
          <h2>Navegación</h2>
          <p>El componente incluye navegación a otras páginas:</p>
          <ul>
            <li><strong>Enlace de recuperación de contraseña:</strong> Dirige al usuario a la ruta "/forgot-password"</li>
            <li><strong>Enlace de registro:</strong> Dirige al usuario a la ruta "/signup"</li>
          </ul>
          <h2>Autenticación externa</h2>
          <p>Utiliza el componente GoogleAuth para implementar el inicio de sesión con Google.</p>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Formulario de inicio de sesión con validación y múltiples opciones de autenticación.'
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story:any) => {
      return <Story />;
    }
  ]
};

// Historia básica
export const Default = {};