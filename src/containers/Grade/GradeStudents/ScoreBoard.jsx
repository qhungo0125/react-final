import React from 'react';
import ScoreBoardItem from './ScoreBoardItem';

const ScoreBoard = (props) => {
  const { students, scoreTypes, onEditClick, onMapClick } = props;
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th scope='col'>Index</th>
          <th scope='col'>mapCode</th>
          <th scope='col'>name</th>
          {scoreTypes.map((scoreType, index) => {
            return (
              <th key={`header-${index}`} scope='col'>{`${scoreType.name} - ${
                scoreType.percentage
              }% - (${scoreType.isPublish ? 'Published' : 'Hidden'})`}</th>
            );
          })}
          <th scope='col'>actions</th>
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
