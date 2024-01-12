import { t } from 'i18next';
import React from 'react';

const ScoreStructureItem = (props) => {
  const {
    data,
    index,
    provided,
    onRemove: handleRemove = () => {},
    setOpenEditForm,
    setSelectedType = () => {},
  } = props;
  const { name, percentage, _id } = data;
  return (
    <tr
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <th scope='row'>{index}</th>
      <td>{name}</td>
      <td>{`${percentage}`}</td>
      <td>
        <div
          className='btn-group'
          role='group'
          aria-label='Basic mixed styles example'
        >
          <button
            type='button'
            className={'btn btn-warning'}
            onClick={(e) => {
              setOpenEditForm(true);
              setSelectedType(data);
            }}
          >
            {t('label.button.edit')}
          </button>

          <button
            type='button'
            className={'btn btn-danger'}
            onClick={async (e) => {
              await handleRemove({ typeId: _id });
            }}
          >
            {t('label.button.remove')}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ScoreStructureItem;
