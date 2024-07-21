import './Burgir.scss';

interface BurgirProps {
  isClicked: boolean;
  handleClick: () => void;
}

export const Burgir = ({ isClicked, handleClick }: BurgirProps) => {
  return (
    <div className={`burgir ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
      <div className="krecha-up"></div>
      <div className="krecha"></div>
      <div className="krecha-down"></div>
    </div>
  );
};
