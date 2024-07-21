import { useState } from 'react';
import './Login.scss';
import { Button } from '../../utilities/Button/Button';

export const Login = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isLockOpen, setIsLockOpen] = useState<boolean>(false);
  const [inputPasswordType, setInputPasswordType] = useState<string>('password');
  const [userName, setUserName] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const handleModalTypeChange = () => {
    setIsRegister(() => !isRegister);
  };

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

  const LoginLink = () => (
    <span className="modal-span">
      Already have an account?{' '}
      <span className="modal-link-switch " onClick={handleModalTypeChange}>
        Sign in
      </span>
    </span>
  );

  const RegisterLink = () => (
    <span className="modal-span">
      Don't have an account?{' '}
      <span className="modal-link-switch " onClick={handleModalTypeChange}>
        Sign up
      </span>
    </span>
  );

  return (
    <div className="login-modal">
      <div className="modal-wrapper">
        <input
          className="username input"
          type="email"
          placeholder=" Email"
          value={userName}
          onChange={handleNameChange}
        />
        <div className="password-wrapper">
          <input
            className="password input"
            type={inputPasswordType}
            placeholder=" Password"
            value={userPassword}
            onChange={handlePasswordChange}
          />
          <button className="show-password" onClick={handleLockClick}>
            {isLockOpen ? String.fromCodePoint(0x0001f513) : String.fromCodePoint(0x0001f512)}
          </button>
        </div>
        {isRegister && (
          <input
            className="password input"
            type={inputPasswordType}
            placeholder=" Confirm password"
          />
        )}
        <Button text={isRegister ? 'Register' : 'Login'} />
        {isRegister ? <LoginLink /> : <RegisterLink />}
      </div>
    </div>
  );
};
