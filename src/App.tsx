import './App.scss';
import { Header } from './components/Header/Header';
import { Login } from './components/Modals/Login/Login';
import { useState } from 'react';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleShowLogin = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const handleShowRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  return (
    <div className="App">
      <Login />
      <Header />
    </div>
  );
}

export default App;
