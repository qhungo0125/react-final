import React from 'react';
import { useTranslation } from 'react-i18next';

const AccountItem = (props) => {
  const {
    selectedRole,
    setIsOpen = () => {},
    account,
    onBlock: handleBlock = () => {},
    onUnMapping: handleUnMap = () => {},
  } = props;
  const { t } = useTranslation();

  const { _id, name, phone, mapCode, isLocked, email, address } = account;

  return (
    <tr className="align-items-center" style={{ verticalAlign: 'middle' }}>
      {selectedRole === t('label.student') && <th scope="row">{mapCode}</th>}
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          {selectedRole === t('label.student') && (
            <button
              onClick={(e) => {
                if (mapCode && mapCode.length) {
                  handleUnMap({ studentId: _id });
                } else {
                  setIsOpen(true);
                }
              }}
              type="button"
              className="btn btn-success"
            >
              {mapCode && mapCode.length ? 'Unmap' : 'Map'}
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
