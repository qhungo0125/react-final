import React from 'react';
import ScoreBoardItem from './ScoreBoardItem';

const ScoreBoard = (props) => {
  const { students, scoreTypes, onEditClick } = props;
  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th scope='col'>Index</th>
          <th scope='col'>mapCode</th>
          <th scope='col'>name</th>
          {scoreTypes.map((scoreType, index) => {
            return (
              <th key={`header-${index}`} scope='col'>{`${scoreType.name} (${
                scoreType.isPublish ? 'Published' : 'Hidden'
              })`}</th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {students.map((item, index) => (
          <ScoreBoardItem
            key={index}
            index={index}
            item={item}
            onEditClick={onEditClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ScoreBoard;
