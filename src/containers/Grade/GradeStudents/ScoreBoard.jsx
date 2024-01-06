import React from 'react';
import ScoreBoardItem from './ScoreBoardItem';
import { t } from 'i18next';

const ScoreBoard = (props) => {
  const { students, scoreTypes, onEditClick, onMapClick } = props;
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th scope='col'>{t('label.index')}</th>
          <th scope='col'>{t('label.student.code')}</th>
          <th scope='col'>{t('label.fullname')}</th>
          {scoreTypes.map((scoreType, index) => {
            return (
              <th key={`header-${index}`} scope='col'>{`${scoreType.name} - ${
                scoreType.percentage
              }% - (${
                scoreType.isPublish ? t('label.show') : t('label.hide')
              })`}</th>
            );
          })}
          <th scope='col'>{t('label.actions')}</th>
        </tr>
      </thead>
      <tbody>
        {students.map((item, index) => (
          <ScoreBoardItem
            key={index}
            index={index}
            item={item}
            onEditClick={onEditClick}
            onMapClick={onMapClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ScoreBoard;
