import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Servicios from './components/Servicios';
import Soluciones from './components/Soluciones';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Servicios />
      <Soluciones />
      <Footer />
    </div>
  );
}

export default App;
