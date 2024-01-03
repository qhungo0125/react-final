import React from 'react';
import ClassItem from './classItem';

const Classes = (props) => {
  const {
    classes = [],
    onCreateCode = () => {},
    onRemoveCode = () => {},
    updateClassStatus = () => {},
  } = props;
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Index</th>
          <th scope="col">name</th>
          <th scope="col">code</th>
          <th scope="col">description</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
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
