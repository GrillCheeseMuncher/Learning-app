import { Button } from '../../../utilities/Button/Button';
import './DeletePopupModal.scss';

interface DeletePopupModalProps {
  onClose: () => void;
  handleRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeletePopupModal = ({ onClose, handleRefresh }: DeletePopupModalProps) => {
  const storageClear = () => {
    localStorage.clear();
    onClose();
    handleRefresh((refresh) => !refresh);
  };

  return (
    <div className="delete-popup-overlay">
      <div className="delete-popup-content">
        <div className="delete-popup-content-top">
          <div className="delete-popup-text">Delete All Data</div>
          <div className="delete-popup-content-top-button" onClick={onClose}>
            ❌
          </div>
        </div>
        <div className="delete-popup-flex-center">
          <div>
            <Button text={'Are you sure?'} onClick={storageClear} />
          </div>
        </div>
      </div>
    </div>
  );
};
