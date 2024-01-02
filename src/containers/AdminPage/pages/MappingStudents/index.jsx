import React from 'react';
import ExcelDownloadButton from './MappingBtn';

const MappingStudents = () => {
  const data = [
    { id: 1, name: 'John', code: 'ABC123' },
    { id: 2, name: 'Jane', code: 'XYZ789' },
    { id: 3, name: 'Bob', code: '123DEF' },
  ];

  return (
    <>
      <ExcelDownloadButton data={data} name={'demoClass'} />
    </>
  );
};

export default MappingStudents;
