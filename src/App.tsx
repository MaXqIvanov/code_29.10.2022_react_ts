import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { CmpPage } from './pages/CmpPage';

function App() {
  return (
    <div className={'app'}>
      <Header></Header>
      <div className={'app_wrapper'}>
        <SideBar />
        <Routes>
          <Route path={'/'} element={<CmpPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
