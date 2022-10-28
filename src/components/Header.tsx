import React, { useState } from 'react';

export const Header = () => {
  const navHeader = [
    {
      id: 1,
      title: 'Просмотр',
    },
    {
      id: 2,
      title: 'Управление',
    },
  ];
  const [currentNavHeader, setCurrentNavHeader] = useState<number>(1);

  return (
    <div className={'header'}>
      {navHeader.map((elem: { id: number; title: string }) => (
        <div
          onClick={() => setCurrentNavHeader(elem.id)}
          key={elem.id}
          className={elem.id === currentNavHeader ? 'header_title_active' : 'header_title'}
        >
          <span>{elem.title}</span>
        </div>
      ))}
    </div>
  );
};
