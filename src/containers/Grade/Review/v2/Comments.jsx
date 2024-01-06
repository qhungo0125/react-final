import React from 'react';

const Comments = (props) => {
  const { selectedRequest, onClose } = props;
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 999,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className='w-25 rounded position-absolute p-4 border border-2 bg-white'
        style={{
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <h4 className='mb-4'>{selectedRequest.title}</h4>
        {selectedRequest.comments.map((comment) => {
          return (
            <div className='mb-4'>
              <h5>{comment.account.name}</h5>
              <div>{comment.content}</div>
            </div>
          );
        })}
        <input type='text' placeholder='input new comment' />
        <button className='btn btn-primary'>send</button>
        <button onClick={(e) => onClose()} className='btn btn-danger'>
          close
        </button>
      </div>
    </div>
  );
};

export default Comments;
