import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SideBar = () => {
  const nav = useNavigate();
  const navSidebarElems = [
    {
      id: 1,
      title: 'По проекту',
      route: '/about_project',
    },
    {
      id: 2,
      title: 'Объекты',
      route: '/objects',
    },
    {
      id: 3,
      title: 'РД',
      route: '/rd',
    },
    {
      id: 4,
      title: 'МТО',
      route: '/mto',
    },
    {
      id: 5,
      title: 'СМР',
      route: '/cmp',
    },
    {
      id: 6,
      title: 'График',
      route: '/schedule',
    },
    {
      id: 7,
      title: 'МиМ',
      route: '/mim',
    },
    {
      id: 8,
      title: 'Рабочие',
      route: '/workers',
    },
    {
      id: 9,
      title: 'Кап вложения',
      route: '/capital investments',
    },
    {
      id: 10,
      title: 'Бюджет',
      route: '/budget',
    },
    {
      id: 11,
      title: 'Финансирование',
      route: '/financing',
    },
    {
      id: 12,
      title: 'Панорамы',
      route: '/panoramas',
    },
    {
      id: 13,
      title: 'Камеры',
      route: '/cameras',
    },
    {
      id: 14,
      title: 'Поручения',
      route: '/orders',
    },
    {
      id: 15,
      title: 'Контрагенты',
      route: '/counterparties',
    },
  ];
  const selectElemsAll = [
    {
      id: 1,
      title: 'Аббревиатура',
    },
    {
      id: 2,
      title: 'Дом',
    },
  ];
  const [isVisibleSelect, setIsVisibleSelect] = useState<boolean>(false);
  const [currentSelect, setCurrentSelect] = useState<navbar>({
    id: 1,
    title: 'Аббревиатура',
  });
  const [currentNavSidebar, setCurrentNavSidebar] = useState<number>(1);
  useEffect(() => {
    const currentNavId = navSidebarElems.filter((elem: sidebar) =>
      elem.route.includes(window.location.pathname.split('/')[1])
    );
    setCurrentNavSidebar(currentNavId[0].id);
  }, [window.location.pathname]);

  return (
    <div className={'sidebar'}>
      <div className={'select_wrapper'}>
        <div
          onClick={() => setIsVisibleSelect(!isVisibleSelect)}
          className={'select_title_wrapper'}
        >
          <div className={'select_title'}>Название проекта</div>
          <div className={'select_choose'}>{currentSelect.title}</div>
        </div>
        {isVisibleSelect && (
          <div className={'select_body'}>
            {selectElemsAll &&
              selectElemsAll.map((elem: navbar) => (
                <div
                  onClick={() => {
                    setCurrentSelect(elem);
                    setIsVisibleSelect(false);
                  }}
                  key={elem.id}
                >
                  {elem.title}
                </div>
              ))}
          </div>
        )}
        <div className={'select_btn_icon'}></div>
      </div>
      {navSidebarElems &&
        navSidebarElems.map((elem: sidebar) => (
          <div
            onClick={() => {
              nav(`${elem.route}`);
              setCurrentNavSidebar(elem.id);
            }}
            className={`sidenav_elem_wrapper ${
              elem.id === currentNavSidebar ? 'sidenav_elem_wrapper_active' : ''
            }`}
            key={elem.id}
          >
            <div className={'sidenav_elem_icon'}></div>
            <div className={'sidenav_elem_title'}>{elem.title}</div>
          </div>
        ))}
    </div>
  );
};

export type sidebar = {
  id: number;
  title: string;
  route: string;
};
export type navbar = {
  id: number;
  title: string;
};
