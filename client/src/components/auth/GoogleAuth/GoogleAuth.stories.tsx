import React from 'react';
import GoogleAuth from './GoogleAuth';
import { Title, Primary, Controls, Stories, ArgTypes } from '@storybook/blocks';

export default {
  title: 'Autenticación/GoogleAuth',
  component: GoogleAuth,
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Botón de Autenticación con Google</h1>
          <p>Julián C</p>
          <p>Este componente implementa un botón para autenticación con Google que puede utilizarse tanto para registro como para inicio de sesión.</p>
          <ul>
            <li>Diseño adaptable según el modo (registro o inicio de sesión)</li>
            <li>Icono oficial de Google</li>
            <li>Callback para manejar la autenticación</li>
            <li>Estilo visual coherente con la identidad de la aplicación</li>
          </ul>
          <h2>Props</h2>
          <ArgTypes />

          <h2>Uso</h2>
          <p>El componente requiere especificar el modo (&#39;signup&#39; o &#39;login&#39;) y opcionalmente un callback.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import GoogleAuth from './GoogleAuth';
              
// Para registro
const SignupPage = () => {
  const handleAuth = () => {
    // Lógica específica para registro
    console.log('Autenticación con Google para registro');
  };
  
  return (
    <div className="auth-container">
      <GoogleAuth 
        mode="signup"
        onAuth={handleAuth}
      />
    </div>
  );
};

// Para inicio de sesión
const LoginPage = () => {
  return (
    <div className="auth-container">
      <GoogleAuth mode="login" onAuth={() => console.log('Login con Google')} />
    </div>
  );
};`}
            </code>
          </pre>
          <h2>Implementación</h2>
          <p>Este componente es utilizado en los formularios de registro e inicio de sesión como método alternativo de autenticación.</p>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Botón para autenticación con Google que funciona tanto para registro como para inicio de sesión.'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['signup', 'login'],
      description: 'Define si el botón se usará para registro o inicio de sesión',
      table: {
        defaultValue: { summary: 'signup' },
      },
    },
    onAuth: {
      action: 'clicked',
      description: 'Función de callback que se ejecuta al hacer clic en el botón',
    },
  },
};

// Historia básica para modo login
export const Login = {
  args: {
    mode: 'login',
  },
};

// Historia para modo signup
export const Signup = {
  args: {
    mode: 'signup',
  },
};