import React from 'react';

const ClassItem = (props) => {
  const { item, index, onCreateCode: handleCreateCode = () => {} } = props;
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
            className="btn btn-success"
            onClick={(e) => {
              handleCreateCode({ classId: _id });
            }}
          >
            Create invitationCode
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ClassItem;
