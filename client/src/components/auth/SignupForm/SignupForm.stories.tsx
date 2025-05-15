import React from 'react';
import SignupForm from './SignupForm';
import { Title, Description, Primary, Controls, Stories } from '@storybook/blocks';

export default {
  title: 'Formularios/SignupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <>
          <Title />
          <h1>Formulario de Registro</h1>
          <p>Julián C</p>
          <p>Este componente implementa un formulario de registro completo con las siguientes características:</p>
          <ul>
            <li>Campos para nombre, apellido, teléfono, email y contraseña</li>
            <li>Validación de todos los campos con mensajes de error</li>
            <li>Opción de registro con Google</li>
            <li>Diseño responsivo con Tailwind CSS</li>
            <li>Estilo visual coherente con la identidad de la aplicación</li>
          </ul>
          <h2>Uso</h2>
          <p>El formulario ya está configurado para validar los datos ingresados y mostrar mensajes de error cuando sea necesario.</p>
          <pre style={{ backgroundColor: '#000', color: "#00ff00", padding: '20px', borderRadius: '5px' }}>
            <code>
              {`import SignupForm from './SignupForm';
              
const MyPage = () => {
  return (
    <div className="container mx-auto">
      <SignupForm />
    </div>
  );
};`}
            </code>
          </pre>
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component: 'Formulario de registro completo con validación y opción de registro con Google.'
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