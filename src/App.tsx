import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { useAppDispatch } from './hooks/redux';
import { CmpPage } from './pages/CmpPage';
import Cookies from 'js-cookie';
import { getSpecialKey } from './store/stringSlice';

function App() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    nav('/cmp');
    if (!Cookies.get('eID')) {
      dispatch(getSpecialKey());
    }
  }, []);
  return (
    <div className={'app'}>
      <Header></Header>
      <div className={'app_wrapper'}>
        <SideBar />
        <Routes>
          <Route path={'/cmp'} element={<CmpPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
