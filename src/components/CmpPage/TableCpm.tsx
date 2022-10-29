import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/redux';
import { RootState } from '../../store/store';
import { createRowInEntity } from '../../store/stringSlice';
import { getNewString, getString } from '../../ts';

export const TableCpm = () => {
  const { stringAll } = useSelector((state: RootState) => state.string);
  const dispatch = useAppDispatch();
  const [currentHoverString, setCurrentHoverString] = useState<Number | null>(null);
  return (
    <div className={'table_wrapper'}>
      <table className={'table'}>
        <thead>
          <tr>
            <th scope="col">Уровень</th>
            <th scope="col">Наименование работ</th>
            <th scope="col">Основная з/п</th>
            <th scope="col">Оборудование</th>
            <th scope="col">Накладные расходы</th>
            <th scope="col">Сметная прибыль</th>
          </tr>
          <div className={'separate_line'}></div>
        </thead>
        <tbody>
          {stringAll?.length > 0 ? (
            stringAll.map((elem: getNewString, index: number) => (
              <tr className={'string_elem'} key={elem.id}>
                <td
                  onMouseEnter={() => setCurrentHoverString(elem.id)}
                  onMouseLeave={() => setCurrentHoverString(null)}
                  scope="row"
                  className={'cell_btn'}
                >
                  <div
                    className={
                      elem.id === currentHoverString ? 'visible_all_btn' : 'not_visible_all_btn'
                    }
                  >
                    <div
                      onClick={() =>
                        dispatch(createRowInEntity({ parentId: null, string: 0, index: index }))
                      }
                      title={'Создать строку'}
                      className={'btn_field_1'}
                    ></div>
                    {currentHoverString === elem.id && (
                      <>
                        <div
                          onClick={() =>
                            dispatch(
                              createRowInEntity({ parentId: elem.id, string: 1, index: index })
                            )
                          }
                          title={'Создать подстроку'}
                          className={'btn_field_2'}
                        ></div>
                        <div className={'btn_text_field'}></div>
                        <div title={'Удалить строку'} className={'btn_delete'}></div>
                      </>
                    )}
                  </div>
                </td>
                <td>{elem.rowName}</td>
                <td>{elem.salary}</td>
                <td scope="row">{elem.equipmentCosts}</td>
                <td>{elem.overheads}</td>
                <td>{elem.estimatedProfit}</td>
                <div className={'separate_line'}></div>
              </tr>
            ))
          ) : (
            <tr className={'empty_string_array'}>
              <td className={'group_btn'}>
                <div
                  onClick={() =>
                    dispatch(createRowInEntity({ parentId: null, string: 0, index: 0 }))
                  }
                  title={'Создать строку'}
                  className={'btn_field_1'}
                ></div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
