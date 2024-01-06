import React from 'react';
import ClassItem from './classItem';
import { t } from 'i18next';

const Classes = (props) => {
  const {
    classes = [],
    onCreateCode = () => {},
    onRemoveCode = () => {},
    updateClassStatus = () => {},
  } = props;
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th scope='col'>{t('label.index')}</th>
          <th scope='col'>{t('label.class.name')}</th>
          <th scope='col'>{t('label.class.code')}</th>
          <th scope='col'>{t('label.description')}</th>
          <th scope='col'>{t('label.status')}</th>
          <th scope='col'>{t('label.actions')}</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((item, index) => (
          <ClassItem
            key={index}
            index={index}
            item={item}
            onCreateCode={onCreateCode}
            onRemoveCode={onRemoveCode}
            updateClassStatus={updateClassStatus}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Classes;
