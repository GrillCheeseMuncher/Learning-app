import { useEffect, useState } from 'react';
import './Settings.scss';
import { ColorResult } from 'react-color';
import Chrome from 'react-color/lib/components/chrome/Chrome';

enum StyleColorVariables {
  background = '--dark',
  cardBackground = '--darkviolet',
  cardForeground = '--violet',
  details = '--red',
}

export const Settings = () => {
  const [colorBackground, setColorBackground] = useState<string>('');
  const [colorCardBackground, setCardBackground] = useState<string>('');
  const [colorCardForeground, setCardForeground] = useState<string>('');
  const [colorDetails, setColorDetails] = useState<string>('');

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

  return (
    <div className="setting-body">
      <Chrome onChange={changeColor(StyleColorVariables.background)} color={colorBackground} />
      <Chrome
        onChange={changeColor(StyleColorVariables.cardBackground)}
        color={colorCardBackground}
      />
      <Chrome
        onChange={changeColor(StyleColorVariables.cardForeground)}
        color={colorCardForeground}
      />
      <Chrome onChange={changeColor(StyleColorVariables.details)} color={colorDetails} />
    </div>
  );
};
