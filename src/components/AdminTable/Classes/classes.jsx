import React from 'react';
import ClassItem from './classItem';

const Classes = (props) => {
  const { classes = [], onCreateCode = () => {} } = props;
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Index</th>
          <th scope="col">name</th>
          <th scope="col">code</th>
          <th scope="col">description</th>
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
          />
        ))}
      </tbody>
    </table>
  );
};

export default Classes;
