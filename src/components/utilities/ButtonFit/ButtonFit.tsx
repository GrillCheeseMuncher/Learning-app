import './ButtonFit.scss';

interface ButtonFitProps {
  text: string;
  onClick?: () => void;
  isMobile?: boolean;
}

export const ButtonFit = ({ text, onClick, isMobile }: ButtonFitProps) => {
  return (
    <button className="guzior-fit" onClick={onClick}>
      <span className="guzior-3d-fit"></span>
      <span className={`front-fit ${isMobile ? ' mobile' : ''}`}>{text}</span>
    </button>
  );
};
