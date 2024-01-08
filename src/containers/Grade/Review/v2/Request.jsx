import { t } from 'i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const Request = (props) => {
  const { request, onClick, onApprove, onReject } = props;
  const navigate = useNavigate();
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
      <div className='mt-2 d-flex gap-4'>
        <button onClick={(e) => onClick()} className='btn btn-info'>
          {t('label.view.comments')}
        </button>
        <button
          onClick={async (e) => {
            await onReject({ requestId: request._id });
          }}
          className='btn btn-danger'
        >
          {t('label.button.reject')}
        </button>
        <button
          onClick={async (e) => {
            await onApprove({
              value: request.expectedScore,
              teacherId: request.teacher._id,
              studentId: request.student._id,
              scoreId: request.score._id,
              requestId: request._id,
            });
          }}
          className='btn btn-success'
        >
          {t('label.button.approve')}
        </button>
        <button
          onClick={(e) => {
            navigate(`./${request._id}`);
          }}
          className='btn btn-success'
        >
          {t('label.button.detail')}
        </button>
      </div>
    </div>
  );
};

export default Request;
