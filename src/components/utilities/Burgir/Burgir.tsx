import './Burgir.scss';

interface BurgirProps {
  isBurgirClicked: boolean;
  handleBurgirClick: () => void;
}

export const Burgir = ({ isBurgirClicked, handleBurgirClick }: BurgirProps) => {
  return (
    <div className={`burgir ${isBurgirClicked ? 'clicked' : ''}`} onClick={handleBurgirClick}>
      <div className="krecha-up"></div>
      <div className="krecha"></div>
      <div className="krecha-down"></div>
    </div>
  );
};
