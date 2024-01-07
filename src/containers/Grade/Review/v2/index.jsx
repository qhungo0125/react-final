import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getClassReviews, sendChatContent } from '../../../../api/review';
import Comments from './Comments';
import Request from './Request';
import { approveRequest, rejectRequest } from '../../../../api/scoreDetail';

const ScoreReview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [requests, setRequests] = React.useState([]);
  const [selectedRequest, setSelectedRequest] = React.useState({});
  const [openComments, setOpenComments] = React.useState(false);

  const getData = async () => {
    const classId = searchParams.get('id');
    const requests = await getClassReviews({ classId });
    if (requests.success && requests.data && requests.data.length > 0) {
      return requests.data;
    }
    return [];
  };

  React.useEffect(() => {
    const getInitData = async () => {
      const data = await getData();
      setRequests(data);
    };
    getInitData();
  }, []);

  const viewCommentHandler = (request) => {
    if (openComments || !request) {
      setOpenComments(false);
      setSelectedRequest({});
    } else {
      setOpenComments(true);
      setSelectedRequest(request);
    }
  };

  const sendChat = async (params) => {
    const { chatContent } = params;
    if (!chatContent || chatContent === '') {
      return;
    }

    try {
      const response = await sendChatContent({
        accountId: localStorage.getItem('userid'),
        requestId: selectedRequest._id,
        content: chatContent,
      });

      if (response.success) {
        const newData = await getData();
        setRequests(newData);

        setSelectedRequest((current) => {
          const _id = current._id;
          const updated = newData.find((item) => item._id === _id);
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (params) => {
    const { value, teacherId, studentId, scoreId, requestId } = params;

    try {
      const response = await approveRequest({
        value,
        teacherId,
        studentId,
        scoreId,
        requestId,
      });

      if (response.success) {
        const newData = await getData();
        setRequests(newData);
        setSelectedRequest({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (params) => {
    const { requestId } = params;

    try {
      const response = await rejectRequest({
        requestId,
      });

      if (response.success) {
        const newData = await getData();
        setRequests(newData);
        setSelectedRequest({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={openComments && 'opacity-25'}>
        {requests.map((request) => {
          return (
            <Request
              request={request}
              onClick={(e) => viewCommentHandler(request)}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          );
        })}
      </div>
      {openComments && (
        <Comments
          onClose={(e) => viewCommentHandler()}
          selectedRequest={selectedRequest}
          onSendChat={(params) => sendChat(params)}
        />
      )}
    </>
  );
};

export default ScoreReview;
