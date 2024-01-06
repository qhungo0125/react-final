import React from 'react';

const Request = (props) => {
  const { request, onClick } = props;
  return (
    <div className='mb-4 border border-2 p-4 rounded'>
      <h4>{request.title}</h4>
      <p>{request.explain}</p>
      <p>student: {request.student.name}</p>
      <p>actual score: {request.actualScore}</p>
      <p>expected score: {request.expectedScore}</p>
      <div className='mt-2 d-flex gap-4'>
        <button onClick={(e) => onClick()} className='btn btn-info'>
          view comments
        </button>

        <button className='btn btn-danger'>reject</button>
        <button className='btn btn-success'>resolve</button>
      </div>
    </div>
  );
};

export default Request;
