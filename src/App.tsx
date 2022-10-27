import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { SideBar } from './components/SideBar';
import { CmpPage } from './pages/CmpPage';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div>
        <SideBar />
        <Routes>
            <Route path={'/cmp'} element={<CmpPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
