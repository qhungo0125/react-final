import { t } from 'i18next';
import React from 'react';

const ClassItem = (props) => {
  const {
    item,
    index,
    onCreateCode: handleCreateCode = () => {},
    onRemoveCode: handleRemoveCode = () => {},
    updateClassStatus: handleUpdateClassStatus = () => {},
  } = props;
  const { _id, name, description, invitationCode, isActived } = item;
  return (
    <tr>
      <th scope='row'>{index}</th>
      <td>{name}</td>
      <td>{invitationCode}</td>
      <td>{description}</td>
      <td>
        {isActived ? t('admin.status.active') : t('admin.status.inactive')}
      </td>
      <td>
        <div
          className='btn-group'
          role='group'
          aria-label='Basic mixed styles example'
        >
          <button
            type='button'
            className={
              invitationCode && invitationCode !== ''
                ? 'btn btn-warning'
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
            {invitationCode ? t('admin.reset.code') : t('admin.add.code')}
          </button>

          <button
            type='button'
            className={isActived ? 'btn btn-danger' : 'btn btn-success'}
            onClick={(e) => {
              handleUpdateClassStatus({ classId: _id, isActived: !isActived });
            }}
          >
            {isActived ? t('admin.status.inactive') : t('admin.status.active')}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ClassItem;
