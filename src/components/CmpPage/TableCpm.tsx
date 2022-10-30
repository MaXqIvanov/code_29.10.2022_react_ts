import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/redux';
import { RootState } from '../../store/store';
import { createRowInEntity, deleteRow, updateRowInEntity } from '../../store/stringSlice';
import { getNewString, getString } from '../../ts';

export const TableCpm = () => {
  const { stringAll } = useSelector((state: RootState) => state.string);
  const dispatch = useAppDispatch();
  const [currentHoverString, setCurrentHoverString] = useState<number | null | undefined>(null);
  const [currentEditString, setCurrentEditString] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [salary, setSalary] = useState<number>(0);
  const [equipment, setEquipment] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [projit, setProjit] = useState<number>(0);
  useEffect(() => {
    if (currentEditString !== null) {
      setName(currentEditString.rowName);
      setSalary(currentEditString.salary);
      setEquipment(currentEditString.equipmentCosts);
      setExpenses(currentEditString.overheads);
      setProjit(currentEditString.estimatedProfit);
    }
  }, [currentEditString]);

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
            stringAll.map((elem: getNewString | any, index: number) => (
              <>
                <tr
                  onDoubleClick={() => setCurrentEditString(elem)}
                  className={'string_elem'}
                  key={elem.id}
                >
                  <td
                    onMouseEnter={() => setCurrentHoverString(elem.id)}
                    onMouseLeave={() => setCurrentHoverString(null)}
                    className={'cell_btn'}
                  >
                    <div
                      className={
                        elem.id === currentHoverString ? 'visible_all_btn' : 'not_visible_all_btn'
                      }
                    >
                      <div
                        onClick={() =>
                          dispatch(
                            createRowInEntity({
                              parentId: null,
                              string: 0,
                              index: index,
                              sub_string_index: 0,
                            })
                          )
                        }
                        title={'Создать строку'}
                        className={'btn_field_1'}
                      ></div>
                      {currentHoverString === elem.id && (
                        <>
                          <div
                            onClick={() =>
                              dispatch(
                                createRowInEntity({
                                  parentId: elem.id,
                                  string: 1,
                                  index: index,
                                  sub_string_index: 0,
                                })
                              )
                            }
                            title={'Создать подстроку'}
                            className={'btn_field_2'}
                          ></div>
                          <div className={'btn_text_field'}></div>
                          <div
                            onClick={() =>
                              dispatch(
                                deleteRow({
                                  id: elem.id,
                                  string: 0,
                                  index: index,
                                  sub_string_index: 0,
                                  last_string_index: 0,
                                })
                              )
                            }
                            title={'Удалить строку'}
                            className={'btn_delete'}
                          ></div>
                        </>
                      )}
                    </div>
                  </td>
                  <td title={'Двойное нажатие для редактирования'}>
                    {currentEditString?.id === elem.id ? (
                      <input
                        onKeyDown={(e) =>
                          e.code === 'Enter' &&
                          dispatch(
                            updateRowInEntity({
                              rowName: name,
                              equipmentCosts: equipment,
                              estimatedProfit: projit,
                              salary: salary,
                              overheads: expenses,
                              id: elem.id,
                              index: index,
                              parentId: null,
                              string: 0,
                              sub_string_index: 0,
                              last_string_index: 0,
                            })
                          )
                        }
                        title={'Enter для отпрвки данных'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={'input_edit'}
                      />
                    ) : (
                      elem.rowName
                    )}
                  </td>
                  <td title={'Двойное нажатие для редактирования'}>
                    {currentEditString?.id === elem.id ? (
                      <input
                        onKeyDown={(e) =>
                          e.code === 'Enter' &&
                          dispatch(
                            updateRowInEntity({
                              rowName: name,
                              equipmentCosts: equipment,
                              estimatedProfit: projit,
                              salary: salary,
                              overheads: expenses,
                              id: elem.id,
                              index: index,
                              parentId: null,
                              string: 0,
                              sub_string_index: 0,
                              last_string_index: 0,
                            })
                          )
                        }
                        title={'Enter для отпрвки данных'}
                        value={salary}
                        className={'input_edit input_number'}
                        type={'number'}
                        onChange={(e) => setSalary(Number(e.target.value))}
                      />
                    ) : (
                      elem.salary
                    )}
                  </td>
                  <td title={'Двойное нажатие для редактирования'}>
                    {currentEditString?.id === elem.id ? (
                      <input
                        onKeyDown={(e) =>
                          e.code === 'Enter' &&
                          dispatch(
                            updateRowInEntity({
                              rowName: name,
                              equipmentCosts: equipment,
                              estimatedProfit: projit,
                              salary: salary,
                              overheads: expenses,
                              id: elem.id,
                              index: index,
                              parentId: null,
                              string: 0,
                              sub_string_index: 0,
                              last_string_index: 0,
                            })
                          )
                        }
                        title={'Enter для отпрвки данных'}
                        value={equipment}
                        className={'input_edit input_number'}
                        type={'number'}
                        onChange={(e) => setEquipment(Number(e.target.value))}
                      />
                    ) : (
                      elem.equipmentCosts
                    )}
                  </td>
                  <td title={'Двойное нажатие для редактирования'}>
                    {currentEditString?.id === elem.id ? (
                      <input
                        onKeyDown={(e) =>
                          e.code === 'Enter' &&
                          dispatch(
                            updateRowInEntity({
                              rowName: name,
                              equipmentCosts: equipment,
                              estimatedProfit: projit,
                              salary: salary,
                              overheads: expenses,
                              id: elem.id,
                              index: index,
                              parentId: null,
                              string: 0,
                              sub_string_index: 0,
                              last_string_index: 0,
                            })
                          )
                        }
                        title={'Enter для отпрвки данных'}
                        value={expenses}
                        className={'input_edit input_number'}
                        type={'number'}
                        onChange={(e) => setExpenses(Number(e.target.value))}
                      />
                    ) : (
                      elem.overheads
                    )}
                  </td>
                  <td title={'Двойное нажатие для редактирования'}>
                    {currentEditString?.id === elem.id ? (
                      <input
                        onKeyDown={(e) =>
                          e.code === 'Enter' &&
                          dispatch(
                            updateRowInEntity({
                              rowName: name,
                              equipmentCosts: equipment,
                              estimatedProfit: projit,
                              salary: salary,
                              overheads: expenses,
                              id: elem.id,
                              index: index,
                              parentId: null,
                              string: 0,
                              sub_string_index: 0,
                              last_string_index: 0,
                            })
                          )
                        }
                        title={'Enter для отпрвки данных'}
                        value={projit}
                        className={'input_edit input_number'}
                        type={'number'}
                        onChange={(e) => setProjit(Number(e.target.value))}
                      />
                    ) : (
                      elem.estimatedProfit
                    )}
                  </td>
                  <div className={'separate_line'}></div>
                </tr>
                {elem.child?.length > 0 &&
                  elem.child.map((subString: getNewString | null, index2: number) => (
                    <>
                      <tr
                        onDoubleClick={() => setCurrentEditString(subString)}
                        className={'substring_elem'}
                        key={subString?.id}
                      >
                        <td
                          onMouseEnter={() => setCurrentHoverString(subString?.id)}
                          onMouseLeave={() => setCurrentHoverString(null)}
                          className={'cell_btn'}
                        >
                          <div
                            style={{
                              bottom: index2 !== 0 ? '30px' : '30px',
                              height:
                                index2 !== 0
                                  ? `calc(62px * ${elem.child[index2 - 1].child.length + 1})`
                                  : '54px',
                            }}
                            className={'link_line'}
                          ></div>
                          <div className={'link_line_horizontal'}></div>
                          <div
                            className={
                              subString?.id === currentHoverString
                                ? 'visible_all_btn'
                                : 'not_visible_all_btn'
                            }
                          >
                            <div
                              onClick={() =>
                                dispatch(
                                  createRowInEntity({
                                    parentId: elem.id,
                                    string: 1,
                                    index: index,
                                    sub_string_index: 0,
                                  })
                                )
                              }
                              title={'Создать подстроку'}
                              className={'btn_field_2'}
                            ></div>
                            {currentHoverString === subString?.id && (
                              <>
                                <div
                                  onClick={() =>
                                    dispatch(
                                      createRowInEntity({
                                        parentId: subString !== null ? subString.id : null,
                                        string: 2,
                                        index: index,
                                        sub_string_index: index2,
                                      })
                                    )
                                  }
                                  className={'btn_text_field'}
                                ></div>
                                <div
                                  onClick={() =>
                                    dispatch(
                                      deleteRow({
                                        id: subString?.id,
                                        string: 1,
                                        index: index,
                                        sub_string_index: index2,
                                        last_string_index: 0,
                                      })
                                    )
                                  }
                                  title={'Удалить подстроку'}
                                  className={'btn_delete'}
                                ></div>
                              </>
                            )}
                          </div>
                        </td>
                        <td title={'Двойное нажатие для редактирования'}>
                          {currentEditString?.id === subString?.id ? (
                            <input
                              onKeyDown={(e) =>
                                e.code === 'Enter' &&
                                dispatch(
                                  updateRowInEntity({
                                    rowName: name,
                                    equipmentCosts: equipment,
                                    estimatedProfit: projit,
                                    salary: salary,
                                    overheads: expenses,
                                    id: subString!.id,
                                    index: index,
                                    parentId: elem.id,
                                    string: 1,
                                    sub_string_index: index2,
                                    last_string_index: 0,
                                  })
                                )
                              }
                              title={'Enter для отпрвки данных'}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className={'input_edit'}
                            />
                          ) : (
                            subString?.rowName
                          )}
                        </td>
                        <td title={'Двойное нажатие для редактирования'}>
                          {currentEditString?.id === subString?.id ? (
                            <input
                              onKeyDown={(e) =>
                                e.code === 'Enter' &&
                                dispatch(
                                  updateRowInEntity({
                                    rowName: name,
                                    equipmentCosts: equipment,
                                    estimatedProfit: projit,
                                    salary: salary,
                                    overheads: expenses,
                                    id: subString!.id,
                                    index: index,
                                    parentId: elem.id,
                                    string: 1,
                                    sub_string_index: index2,
                                    last_string_index: 0,
                                  })
                                )
                              }
                              title={'Enter для отпрвки данных'}
                              value={salary}
                              className={'input_edit input_number'}
                              type={'number'}
                              onChange={(e) => setSalary(Number(e.target.value))}
                            />
                          ) : (
                            subString?.salary
                          )}
                        </td>
                        <td title={'Двойное нажатие для редактирования'}>
                          {currentEditString?.id === subString?.id ? (
                            <input
                              onKeyDown={(e) =>
                                e.code === 'Enter' &&
                                dispatch(
                                  updateRowInEntity({
                                    rowName: name,
                                    equipmentCosts: equipment,
                                    estimatedProfit: projit,
                                    salary: salary,
                                    overheads: expenses,
                                    id: subString!.id,
                                    index: index,
                                    parentId: elem.id,
                                    string: 1,
                                    sub_string_index: index2,
                                    last_string_index: 0,
                                  })
                                )
                              }
                              title={'Enter для отпрвки данных'}
                              value={equipment}
                              className={'input_edit input_number'}
                              type={'number'}
                              onChange={(e) => setEquipment(Number(e.target.value))}
                            />
                          ) : (
                            subString?.equipmentCosts
                          )}
                        </td>
                        <td title={'Двойное нажатие для редактирования'}>
                          {currentEditString?.id === subString?.id ? (
                            <input
                              onKeyDown={(e) =>
                                e.code === 'Enter' &&
                                dispatch(
                                  updateRowInEntity({
                                    rowName: name,
                                    equipmentCosts: equipment,
                                    estimatedProfit: projit,
                                    salary: salary,
                                    overheads: expenses,
                                    id: subString!.id,
                                    index: index,
                                    parentId: elem.id,
                                    string: 1,
                                    sub_string_index: index2,
                                    last_string_index: 0,
                                  })
                                )
                              }
                              title={'Enter для отпрвки данных'}
                              value={expenses}
                              className={'input_edit input_number'}
                              type={'number'}
                              onChange={(e) => setExpenses(Number(e.target.value))}
                            />
                          ) : (
                            subString?.overheads
                          )}
                        </td>
                        <td title={'Двойное нажатие для редактирования'}>
                          {currentEditString?.id === subString?.id ? (
                            <input
                              onKeyDown={(e) =>
                                e.code === 'Enter' &&
                                dispatch(
                                  updateRowInEntity({
                                    rowName: name,
                                    equipmentCosts: equipment,
                                    estimatedProfit: projit,
                                    salary: salary,
                                    overheads: expenses,
                                    id: subString!.id,
                                    index: index,
                                    parentId: elem.id,
                                    string: 1,
                                    sub_string_index: index2,
                                    last_string_index: 0,
                                  })
                                )
                              }
                              title={'Enter для отпрвки данных'}
                              value={projit}
                              className={'input_edit input_number'}
                              type={'number'}
                              onChange={(e) => setProjit(Number(e.target.value))}
                            />
                          ) : (
                            subString?.estimatedProfit
                          )}
                        </td>
                        <div className={'separate_line'}></div>
                      </tr>
                      {subString !== null &&
                        subString.child?.length > 0 &&
                        subString.child.map((lastString: getNewString | null, index3: number) => (
                          <tr
                            className={'btn_text_field_elem'}
                            key={lastString?.id}
                            onDoubleClick={() => setCurrentEditString(lastString)}
                          >
                            <td
                              onMouseEnter={() => setCurrentHoverString(lastString?.id)}
                              onMouseLeave={() => setCurrentHoverString(null)}
                              className={'cell_btn'}
                            >
                              <div
                                style={{
                                  top: index3 !== 0 ? '-31px' : '-24px',
                                  height: index3 !== 0 ? '62px' : '56px',
                                }}
                                className={'link_line'}
                              ></div>
                              <div className={'link_line_horizontal'}></div>
                              <div
                                className={
                                  lastString?.id === currentHoverString
                                    ? 'visible_all_btn'
                                    : 'not_visible_all_btn'
                                }
                              >
                                <div
                                  onClick={() =>
                                    dispatch(
                                      createRowInEntity({
                                        parentId: subString.id,
                                        string: 2,
                                        index: index,
                                        sub_string_index: index2,
                                      })
                                    )
                                  }
                                  title={'Создать обычную строку'}
                                  className={'btn_text_field'}
                                ></div>
                                {currentHoverString === lastString?.id && (
                                  <>
                                    <div
                                      onClick={() =>
                                        dispatch(
                                          deleteRow({
                                            id: lastString?.id,
                                            string: 2,
                                            index: index,
                                            sub_string_index: index2,
                                            last_string_index: index3,
                                          })
                                        )
                                      }
                                      title={'Удалить обычную строку'}
                                      className={'btn_delete'}
                                    ></div>
                                  </>
                                )}
                              </div>
                            </td>
                            <td title={'Двойное нажатие для редактирования'}>
                              {currentEditString?.id === lastString?.id ? (
                                <input
                                  onKeyDown={(e) =>
                                    e.code === 'Enter' &&
                                    dispatch(
                                      updateRowInEntity({
                                        rowName: name,
                                        equipmentCosts: equipment,
                                        estimatedProfit: projit,
                                        salary: salary,
                                        overheads: expenses,
                                        id: lastString!.id,
                                        index: index,
                                        parentId: subString.id,
                                        string: 2,
                                        sub_string_index: index2,
                                        last_string_index: index3,
                                      })
                                    )
                                  }
                                  title={'Enter для отпрвки данных'}
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className={'input_edit'}
                                />
                              ) : (
                                lastString?.rowName
                              )}
                            </td>
                            <td title={'Двойное нажатие для редактирования'}>
                              {currentEditString?.id === lastString?.id ? (
                                <input
                                  onKeyDown={(e) =>
                                    e.code === 'Enter' &&
                                    dispatch(
                                      updateRowInEntity({
                                        rowName: name,
                                        equipmentCosts: equipment,
                                        estimatedProfit: projit,
                                        salary: salary,
                                        overheads: expenses,
                                        id: lastString!.id,
                                        index: index,
                                        parentId: subString.id,
                                        string: 2,
                                        sub_string_index: index2,
                                        last_string_index: index3,
                                      })
                                    )
                                  }
                                  title={'Enter для отпрвки данных'}
                                  value={salary}
                                  className={'input_edit input_number'}
                                  type={'number'}
                                  onChange={(e) => setSalary(Number(e.target.value))}
                                />
                              ) : (
                                lastString?.salary
                              )}
                            </td>
                            <td title={'Двойное нажатие для редактирования'}>
                              {currentEditString?.id === lastString?.id ? (
                                <input
                                  onKeyDown={(e) =>
                                    e.code === 'Enter' &&
                                    dispatch(
                                      updateRowInEntity({
                                        rowName: name,
                                        equipmentCosts: equipment,
                                        estimatedProfit: projit,
                                        salary: salary,
                                        overheads: expenses,
                                        id: lastString!.id,
                                        index: index,
                                        parentId: subString.id,
                                        string: 2,
                                        sub_string_index: index2,
                                        last_string_index: index3,
                                      })
                                    )
                                  }
                                  title={'Enter для отпрвки данных'}
                                  value={equipment}
                                  className={'input_edit input_number'}
                                  type={'number'}
                                  onChange={(e) => setEquipment(Number(e.target.value))}
                                />
                              ) : (
                                lastString?.equipmentCosts
                              )}
                            </td>
                            <td title={'Двойное нажатие для редактирования'}>
                              {currentEditString?.id === lastString?.id ? (
                                <input
                                  onKeyDown={(e) =>
                                    e.code === 'Enter' &&
                                    dispatch(
                                      updateRowInEntity({
                                        rowName: name,
                                        equipmentCosts: equipment,
                                        estimatedProfit: projit,
                                        salary: salary,
                                        overheads: expenses,
                                        id: lastString!.id,
                                        index: index,
                                        parentId: subString.id,
                                        string: 2,
                                        sub_string_index: index2,
                                        last_string_index: index3,
                                      })
                                    )
                                  }
                                  title={'Enter для отпрвки данных'}
                                  value={expenses}
                                  className={'input_edit input_number'}
                                  type={'number'}
                                  onChange={(e) => setExpenses(Number(e.target.value))}
                                />
                              ) : (
                                lastString?.overheads
                              )}
                            </td>
                            <td title={'Двойное нажатие для редактирования'}>
                              {currentEditString?.id === lastString?.id ? (
                                <input
                                  onKeyDown={(e) =>
                                    e.code === 'Enter' &&
                                    dispatch(
                                      updateRowInEntity({
                                        rowName: name,
                                        equipmentCosts: equipment,
                                        estimatedProfit: projit,
                                        salary: salary,
                                        overheads: expenses,
                                        id: lastString!.id,
                                        index: index,
                                        parentId: subString.id,
                                        string: 2,
                                        sub_string_index: index2,
                                        last_string_index: index3,
                                      })
                                    )
                                  }
                                  title={'Enter для отпрвки данных'}
                                  value={projit}
                                  className={'input_edit input_number'}
                                  type={'number'}
                                  onChange={(e) => setProjit(Number(e.target.value))}
                                />
                              ) : (
                                lastString?.estimatedProfit
                              )}
                            </td>
                            <div className={'separate_line'}></div>
                          </tr>
                        ))}
                    </>
                  ))}
              </>
            ))
          ) : (
            <tr className={'empty_string_array'}>
              <td className={'group_btn'}>
                <div
                  onClick={() =>
                    dispatch(
                      createRowInEntity({
                        parentId: null,
                        string: 0,
                        index: 0,
                        sub_string_index: 0,
                      })
                    )
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
