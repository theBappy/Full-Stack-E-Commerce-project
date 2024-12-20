import React from 'react';
import viteLogo from './assets/images/vite.svg';
import javascriptLogo from './assets/images/javascript.svg';
import Counter from './components/Counter'; // Importing the Counter component
import AppRoutes from './AppRoutes';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Initialize the Stripe instance with your publishable key
const stripePromise = loadStripe('pk_test_51QUqZtB9k7mttOuhLwRzabqHgpmLzQTjpgz17KwD8X1WsTGwNfCitkI2doEQm7Lu2oSuel7uyLmaTe6F2HyySl6M00QvxqomsD'); // Replace with your actual Stripe publishable key

const App = () => {
  return (
    <Elements stripe={stripePromise}> {/* Wrap everything inside Elements */}
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
          <img src={javascriptLogo} className="logo vanilla" alt="JavaScript logo" />
        </a>
        <h1>Hello Vite + React!</h1>

        <div className="card">
          {/* Using the Counter component here */}
          <Counter />
        </div>

        <p className="read-the-docs">
          Click on the Vite logo to learn more
        </p>
        
        {/* Rendering the routes */}
        <AppRoutes />
      </div>
    </Elements>
  );
};

export default App;
