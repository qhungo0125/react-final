import React from 'react';

const Request = (props) => {
  const { request, onClick } = props;
  return (
    <div>
      <h4>{request.title}</h4>
      <p>{request.explain}</p>
      <p>student: {request.student.name}</p>
      <p>actual score: {request.actualScore}</p>
      <p>expected score: {request.expectedScore}</p>
      <button onClick={(e) => onClick()} className='btn btn-info'>
        view comments
      </button>
      <button className='btn btn-danger'>reject</button>
      <button className='btn btn-danger'>resolve</button>
    </div>
  );
};

export default Request;
