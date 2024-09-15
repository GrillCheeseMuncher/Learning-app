import './Button.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className="guzior" onClick={onClick}>
      <span className="guzior-3d"></span>
      <span className="front">{text}</span>
    </button>
  );
};
