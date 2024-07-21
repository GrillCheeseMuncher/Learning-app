import './Button.scss';

interface ButtonProps {
  text: string;
}

export const Button = ({ text }: ButtonProps) => {
  return (
    <button className="guzior">
      <span className="guzior-3d"></span>
      <span className="front">{text}</span>
    </button>
  );
};
