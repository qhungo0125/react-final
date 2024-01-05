import React from 'react';

const ScoreBoardItem = (props) => {
  const { item, index, onEditClick: handleEdit = () => {}, onMapClick } = props;
  const { _id, name, mapCode, scoreTypes } = item;
  return (
    <tr>
      <th scope='row'>{index}</th>
      <td>{mapCode}</td>
      <td>{name}</td>
      {scoreTypes.map((scoreType) => {
        return <td key={scoreType._id}>{scoreType.value}</td>;
      })}
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
              handleEdit({ student: item });
            }}
          >
            Edit
          </button>
          {!mapCode && (
            <button
              type='button'
              className={'btn btn-warning'}
              onClick={(e) => {
                onMapClick({ student: item });
              }}
            >
              Map
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ScoreBoardItem;
