import React from 'react';

const ScoreStructureItem = (props) => {
  const { data, index, provided } = props;
  const { name, percentage } = data;
  return (
    <tr
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <th scope='row'>{index}</th>
      <td>{name}</td>
      <td>{`${percentage} %`}</td>
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
              // if (!invitationCode || invitationCode === '') {
              //   handleCreateCode({ classId: _id });
              // } else {
              //   handleRemoveCode({ classId: _id });
              // }
            }}
          >
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ScoreStructureItem;
