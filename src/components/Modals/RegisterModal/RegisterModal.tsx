import { useState } from 'react';
import './RegisterModal.scss';
import { Button } from '../../utilities/Button/Button';

interface RegisterModalProps {
  onShowLogin: () => void;
  onClose: () => void;
}

export const RegisterModal = ({ onShowLogin, onClose }: RegisterModalProps) => {
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
        <input className="password input" type={inputPasswordType} placeholder="confirm password" />
        <Button text="Register" />
        <span className="register-span">
          Already have an account?{' '}
          <span className="login-acc" onClick={onShowLogin}>
            Sign in
          </span>
        </span>
      </div>
    </div>
  );
};
