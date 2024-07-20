import './Button.scss';

interface ButtonProps {
  text: string;
}

export const Button = ({ text }: ButtonProps) => {
  return <button className="guzior">{text}</button>;
};
