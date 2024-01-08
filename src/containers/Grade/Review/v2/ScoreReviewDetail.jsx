import React from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../../../../api/scoreDetail';
import ScoreDetail from './ScoreDetail';
import { sendChatContent } from '../../../../api/review';

const ScoreReviewDetail = () => {
  const { reviewId, classId } = useParams();
  const [request, setRequest] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const getData = async () => {
    setLoading(true);
    const response = await getRequest({
      reviewId,
    });
    if (response.success) {
      setRequest(response.data);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    getData();
  }, []);

  const sendChat = async (params) => {
    const { chatContent } = params;
    if (!chatContent || chatContent === '') {
      return;
    }

    try {
      const response = await sendChatContent({
        accountId: localStorage.getItem('userid'),
        requestId: reviewId,
        content: chatContent,
      });

      if (response.success) {
        await getData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    request && (
      <div className='rounded position-absolute p-4 bg-white'>
        <ScoreDetail selectedRequest={request} onSendChat={sendChat} />
      </div>
    )
  );
};

export default ScoreReviewDetail;
