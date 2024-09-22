import { useEffect, useState } from 'react';
import './Settings.scss';
import { Theme } from './component/Theme/Theme';

interface SettingListName {
  name: string;
  id: number;
}

const settingListNames: SettingListName[] = [
  { name: 'THEME', id: 0 },
  { name: '???', id: 1 },
  { name: '???', id: 2 },
  { name: '???', id: 3 },
  { name: '???', id: 4 },
  { name: '???', id: 5 },
  { name: '???', id: 6 },
  { name: '???', id: 7 },
];

export const Settings = () => {
  const [currentSettingListId, setCurrentSettingListId] = useState<number>(0);

  const handleCurrentSettingListIdClick = (id: number) => {
    setCurrentSettingListId(id);
  };

  const settingList = settingListNames.map((item) => {
    const handleSettingListClick = () => {
      handleCurrentSettingListIdClick(item.id);
    };

    return (
      <li
        key={item.id}
        className={`setting-menu-list-record${currentSettingListId === item.id ? ' active' : ''}`}
        onClick={handleSettingListClick}
      >
        {item.name}
      </li>
    );
  });

  return (
    <div className="setting-body">
      <div className="setting-body-inside">
        <div className="setting-body-inside-list">{settingList}</div>
        <div className="setting-body-inside-content">
          {currentSettingListId === 0 && <Theme />}
          {currentSettingListId > 0 && (
            <div className="setting-body-inside-content-construction">
              The site is under construction
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
