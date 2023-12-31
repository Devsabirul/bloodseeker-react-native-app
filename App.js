import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/components/AppNav';
function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;