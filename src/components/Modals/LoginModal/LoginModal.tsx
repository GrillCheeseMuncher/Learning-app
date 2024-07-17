import { useState } from 'react';
import './LoginModal.scss';
import { Button } from '../../utilities/Button/Button';

interface LoginModalProps {
  onShowRegister: () => void;
  onClose: () => void;
}

export const LoginModal = ({ onShowRegister, onClose }: LoginModalProps) => {
  const [isLockOpen, setIsLockOpen] = useState<boolean>(false);
  const [inputPasswordType, setInputPasswordType] = useState<string>('password');
  const [userName, setUserName] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const handleLockClick = () => {
    setIsLockOpen((isLockOpen) => !isLockOpen);
    setInputPasswordType(!isLockOpen ? 'text' : 'password');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  return (
    <div className="login-modal">
      <div className="modal-wrapper">
        <input
          className="username input"
          type="email"
          placeholder="type email"
          value={userName}
          onChange={handleNameChange}
        />
        <div className="password-wrapper">
          <input
            className="password input"
            type={inputPasswordType}
            placeholder="type password"
            value={userPassword}
            onChange={handlePasswordChange}
          />
          <button className="show-password" onClick={handleLockClick}>
            {isLockOpen ? String.fromCodePoint(0x0001f513) : String.fromCodePoint(0x0001f512)}
          </button>
        </div>
        <Button text="Login" />
        <span className="login-span">
          Don't have an account?{' '}
          <span className="register-acc" onClick={onShowRegister}>
            Sign up
          </span>
        </span>
      </div>
    </div>
  );
};
