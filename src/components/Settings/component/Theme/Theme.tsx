import { useEffect, useState } from 'react';
import './Theme.scss';
import { ColorResult } from 'react-color';
import Chrome from 'react-color/lib/components/chrome/Chrome';

enum StyleColorVariables {
  background = '--dark',
  cardBackground = '--darkviolet',
  cardForeground = '--violet',
  details = '--red',
}

interface ThemeProps {}

export const Theme = ({}: ThemeProps) => {
  const [colorBackground, setColorBackground] = useState<string>('');
  const [colorCardBackground, setCardBackground] = useState<string>('');
  const [colorCardForeground, setCardForeground] = useState<string>('');
  const [colorDetails, setColorDetails] = useState<string>('');
  const [backgroundPopupShow, setBackgroundPopupShow] = useState<boolean>(false);
  const [cardBackgroundPopupShow, setCardBackgroundPopupShow] = useState<boolean>(false);
  const [cardForegroundPopupShow, setCardForegroundPopupShow] = useState<boolean>(false);
  const [detailsPopupShow, setDetailsPopupShow] = useState<boolean>(false);
  const isPickerVisible =
    backgroundPopupShow || cardBackgroundPopupShow || cardForegroundPopupShow || detailsPopupShow;

  useEffect(() => {
    setColorBackground(
      getComputedStyle(document.body).getPropertyValue(StyleColorVariables.background)
    );
    setCardBackground(
      getComputedStyle(document.body).getPropertyValue(StyleColorVariables.cardBackground)
    );
    setCardForeground(
      getComputedStyle(document.body).getPropertyValue(StyleColorVariables.cardForeground)
    );
    setColorDetails(getComputedStyle(document.body).getPropertyValue(StyleColorVariables.details));
  }, []);

  const changeColor = (variable: StyleColorVariables) => (color: ColorResult) => {
    switch (variable) {
      case StyleColorVariables.background:
        setColorBackground(color.hex);
        break;
      case StyleColorVariables.cardBackground:
        setCardBackground(color.hex);
        break;
      case StyleColorVariables.cardForeground:
        setCardForeground(color.hex);
        break;
      case StyleColorVariables.details:
        setColorDetails(color.hex);
        break;
    }
    document.documentElement.style.setProperty(variable, color.hex);
  };

  const closeAllPopups = () => {
    setBackgroundPopupShow(false);
    setCardBackgroundPopupShow(false);
    setCardForegroundPopupShow(false);
    setDetailsPopupShow(false);
  };

  const handleBackgroundPopupShow = () => {
    closeAllPopups();
    setBackgroundPopupShow(true);
  };
  const handleCardBackgroundPopupShow = () => {
    closeAllPopups();
    setCardBackgroundPopupShow(true);
  };
  const handleCardForegroundPopupShow = () => {
    closeAllPopups();
    setCardForegroundPopupShow(true);
  };
  const handleDetailsPopupShow = () => {
    closeAllPopups();
    setDetailsPopupShow(true);
  };

  const colorStyle = (str: string) => {
    if (str === colorBackground) {
      return { backgroundColor: `${colorBackground}` };
    } else if (str === colorCardBackground) {
      return { backgroundColor: `${colorCardBackground}` };
    } else if (str === colorCardForeground) {
      return { backgroundColor: `${colorCardForeground}` };
    } else if (str === colorDetails) {
      return { backgroundColor: `${colorDetails}` };
    }
  };

  return (
    <div className="setting-body-inside-content-theme">
      <div className="setting-theme-button-content">
        <div className="setting-theme-button-text">Background color</div>
        <div className="setting-theme-button-outside">
          <div
            className="setting-theme-button-inside"
            style={colorStyle(colorBackground)}
            onClick={handleBackgroundPopupShow}
          >
            {colorBackground}
          </div>
        </div>
        <div className="setting-theme-button-popup">
          {backgroundPopupShow && (
            <Chrome
              onChange={changeColor(StyleColorVariables.background)}
              color={colorBackground}
              disableAlpha={true}
              onChangeComplete={closeAllPopups}
            />
          )}
        </div>
      </div>
      <div className="setting-theme-button-content">
        <div className="setting-theme-button-text">First color</div>
        <div className="setting-theme-button-outside">
          <div
            className="setting-theme-button-inside"
            style={colorStyle(colorCardBackground)}
            onClick={handleCardBackgroundPopupShow}
          >
            {colorCardBackground}
          </div>
        </div>
        <div className="setting-theme-button-popup">
          {cardBackgroundPopupShow && (
            <Chrome
              onChange={changeColor(StyleColorVariables.cardBackground)}
              color={colorCardBackground}
              disableAlpha={true}
              onChangeComplete={closeAllPopups}
            />
          )}
        </div>
      </div>
      <div className="setting-theme-button-content">
        <div className="setting-theme-button-text">Second color</div>
        <div className="setting-theme-button-outside">
          <div
            className="setting-theme-button-inside"
            style={colorStyle(colorCardForeground)}
            onClick={handleCardForegroundPopupShow}
          >
            {colorCardForeground}
          </div>
        </div>
        <div className="setting-theme-button-popup">
          {cardForegroundPopupShow && (
            <Chrome
              onChange={changeColor(StyleColorVariables.cardForeground)}
              color={colorCardForeground}
              disableAlpha={true}
              onChangeComplete={closeAllPopups}
            />
          )}
        </div>
      </div>
      <div className="setting-theme-button-content">
        <div className="setting-theme-button-text">Accent color</div>
        <div className="setting-theme-button-outside">
          <div
            className="setting-theme-button-inside"
            style={colorStyle(colorDetails)}
            onClick={handleDetailsPopupShow}
          >
            {colorDetails}
          </div>
        </div>
        <div className="setting-theme-button-popup">
          {detailsPopupShow && (
            <Chrome
              onChange={changeColor(StyleColorVariables.details)}
              color={colorDetails}
              disableAlpha={true}
              onChangeComplete={closeAllPopups}
            />
          )}
        </div>
      </div>
      {<div className="setting-overlay" onClick={closeAllPopups}></div>}
    </div>
  );
};
