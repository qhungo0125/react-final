import React from 'react';

const AccountItem = (props) => {
  const {
    account,
    onMapping: handleMapping = () => {},
    onBlock: handleBlock = () => {},
  } = props;

  const { _id, name, phone, mapCode, isLocked, email, address, avatar, role } =
    account;

  return (
    <tr className="align-items-center" style={{ verticalAlign: 'middle' }}>
      <th scope="row">{mapCode}</th>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>{role}</td>
      <td>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            onClick={(e) => {
              handleMapping();
            }}
            type="button"
            className="btn btn-success"
          >
            Mapping
          </button>

          <button
            onClick={(e) => {
              handleBlock({ id: _id, isLocked });
            }}
            type="button"
            className={isLocked ? 'btn btn-warning' : 'btn btn-danger'}
          >
            {isLocked ? 'Unlock' : 'Block'}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AccountItem;
