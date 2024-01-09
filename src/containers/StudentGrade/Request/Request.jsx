import { t } from 'i18next';
import React from 'react';

const Request = (props) => {
  const { request, onClick } = props;
  return (
    <div className='mb-4 border border-2 p-4 rounded'>
      <h4>{request.title}</h4>
      <p>{request.explain}</p>
      <p>
        {t('label.student')}: {request.student.name}
      </p>
      <p>
        {t('label.actual.score')}: {request.actualScore}
      </p>
      <p>
        {t('label.expected.score')}: {request.expectedScore}
      </p>
      <div className='mt-2 d-flex gap-4 justify-content-center'>
        <button onClick={(e) => onClick()} className='btn btn-info'>
          {t('label.view.comments')}
        </button>
      </div>
    </div>
  );
};

export default Request;
