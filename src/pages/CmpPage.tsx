import React, { useEffect } from 'react';
import { HeaderCmp } from '../components/CmpPage/HeaderCmp';
import { useAppDispatch } from '../hooks/redux';
import '../scss/cmp.scss';
import { getTreeRows } from '../store/stringSlice';

export const CmpPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTreeRows());
  }, []);

  return (
    <div className={'cmp_body'}>
      <HeaderCmp />
    </div>
  );
};
