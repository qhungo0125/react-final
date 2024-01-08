import { t } from 'i18next';
import React from 'react';

const ScoreDetail = ({ selectedRequest, onSendChat }) => {
  const [chatContent, setChatContent] = React.useState('');
  return (
    <>
      <h4 className='mb-4 text-center'>{selectedRequest.title}</h4>
      <p className='mb-4'>{selectedRequest.explain}</p>
      <div className='mt-2'>
        <h6 className='mb-2'>{t('label.list.comments')}</h6>
        {selectedRequest.comments.map((comment) => {
          return (
            <div className='mb-4'>
              <h6>{comment.account.name}</h6>
              <div>{comment.content}</div>
            </div>
          );
        })}
      </div>
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
    </>
  );
};

export default ScoreDetail;
