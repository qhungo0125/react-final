import React from 'react';
import MappingForm from './mappingForm';

const AccountItem = (props) => {
  const {
    selectedRole,
    setIsOpen = () => {},
    account,
    onBlock: handleBlock = () => {},
  } = props;

  const { _id, name, phone, mapCode, isLocked, email, address, avatar, role } =
    account;

  return (
    <tr className="align-items-center" style={{ verticalAlign: 'middle' }}>
      {selectedRole === 'student' && <th scope="row">{mapCode}</th>}
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
          {role === 'student' && (
            <button
              onClick={(e) => {
                setIsOpen(true);
              }}
              type="button"
              className="btn btn-success"
            >
              Mapping
            </button>
          )}

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
