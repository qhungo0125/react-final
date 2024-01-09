import { t } from 'i18next';
import React from 'react';

const Comment = (props) => {
  const { selectedRequest, onClose, onSendChat } = props;
  const [chatContent, setChatContent] = React.useState('');
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
        <h4 className='mb-4 text-center'>{selectedRequest.title}</h4>
        <p className='mb-4'>{selectedRequest.explain}</p>
        {selectedRequest.comments.map((comment) => {
          return (
            <div className='mb-4'>
              <h6>{comment.account.name}</h6>
              <div>{comment.content}</div>
            </div>
          );
        })}
        <div className='d-flex justify-content-between mb-4 gap-4'>
          <input
            type='text'
            className='w-100 p-2'
            style={{
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              height: '2.5rem',
            }}
            placeholder={t('label.write.comment')}
            value={chatContent}
            onChange={(e) => setChatContent(e.target.value)}
          />
          <button
            onClick={async (e) => {
              await onSendChat({ chatContent });
              setChatContent('');
            }}
            className='btn btn-primary'
          >
            {t('label.button.send')}
          </button>
        </div>
        <div className='text-center'>
          <button onClick={(e) => onClose()} className='btn btn-danger'>
            {t('label.button.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
