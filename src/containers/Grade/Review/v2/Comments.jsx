import { t } from 'i18next';
import React from 'react';
import ScoreDetail from './ScoreDetail';

const Comments = (props) => {
  const { selectedRequest, onClose, onSendChat } = props;
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
        <ScoreDetail
          selectedRequest={selectedRequest}
          onSendChat={onSendChat}
        />
        <div className='text-center'>
          <button onClick={(e) => onClose()} className='btn btn-danger'>
            {t('label.button.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
