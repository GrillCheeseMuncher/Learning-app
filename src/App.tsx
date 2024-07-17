import './App.scss';
import { Header } from './components/Header/Header';
import { LoginModal } from './components/Modals/LoginModal/LoginModal';
import { RegisterModal } from './components/Modals/RegisterModal/RegisterModal';
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

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <div className="App">
      {showLoginModal && (
        <LoginModal onShowRegister={handleShowRegister} onClose={handleCloseModals} />
      )}
      {showRegisterModal && (
        <RegisterModal onShowLogin={handleShowLogin} onClose={handleCloseModals} />
      )}
      <Header />
    </div>
  );
}

export default App;
