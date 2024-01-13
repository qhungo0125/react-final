import { t } from 'i18next';
import React from 'react';

const AccountItem = (props) => {
  const {
    selectedRole,
    setIsOpen = () => {},
    account,
    onBlock: handleBlock = () => {},
    onUnMapping: handleUnMap = () => {},
  } = props;

  const { _id, name, phone, mapCode, isLocked, email, address } = account;

  return (
    <tr className='align-items-center' style={{ verticalAlign: 'middle' }}>
      {selectedRole === 'student' && <th scope='row'>{mapCode}</th>}
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{address}</td>
      <td>
        <div
          className='btn-group'
          role='group'
          aria-label='Basic mixed styles example'
        >
          {selectedRole === 'student' && (
            <button
              onClick={(e) => {
                if (mapCode && mapCode.length) {
                  handleUnMap({ studentId: _id });
                } else {
                  setIsOpen(true);
                }
              }}
              type='button'
              className='btn btn-success'
            >
              {mapCode && mapCode.length
                ? t('label.button.unmap.code')
                : t('label.button.map.code')}
            </button>
          )}

          <button
            onClick={(e) => {
              handleBlock({ id: _id, isLocked });
            }}
            type='button'
            className={isLocked ? 'btn btn-warning' : 'btn btn-danger'}
          >
            {isLocked ? t('label.button.unblock') : t('label.button.block')}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AccountItem;
