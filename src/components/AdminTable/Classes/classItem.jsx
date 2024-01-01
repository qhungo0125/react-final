import React from 'react';

const ClassItem = (props) => {
  const {
    item,
    index,
    onCreateCode: handleCreateCode = () => {},
    onRemoveCode: handleRemoveCode = () => {},
  } = props;
  const { _id, name, description, invitationCode } = item;
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{name}</td>
      <td>{invitationCode}</td>
      <td>{description}</td>
      <td>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button type="button" className="btn btn-success">
            Add member
          </button>
          <button type="button" className="btn btn-info">
            Invite member
          </button>
          <button
            type="button"
            className={
              invitationCode && invitationCode !== ''
                ? 'btn btn-danger'
                : 'btn btn-primary'
            }
            onClick={(e) => {
              if (!invitationCode || invitationCode === '') {
                handleCreateCode({ classId: _id });
              } else {
                handleRemoveCode({ classId: _id });
              }
            }}
          >
            {invitationCode ? 'Reset Code' : 'Create Code'}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ClassItem;
