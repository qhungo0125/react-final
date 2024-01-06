import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getClassReviews } from '../../../../api/review';
import Comments from './Comments';
import Request from './Request';

const ScoreReview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [requests, setRequests] = React.useState([]);
  const [selectedRequest, setSelectedRequest] = React.useState({});
  const [openComments, setOpenComments] = React.useState(false);
  console.log(selectedRequest);

  const viewCommentHandler = (request) => {
    if (openComments || !request) {
      setOpenComments(false);
      setSelectedRequest({});
    } else {
      setOpenComments(true);
      setSelectedRequest(request);
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      const classId = searchParams.get('id');
      const requests = await getClassReviews({ classId });

      if (requests.success && requests.data && requests.data.length > 0) {
        setRequests(requests.data);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className={openComments && 'opacity-25'}>
        {requests.map((request) => {
          return (
            <Request
              request={request}
              onClick={(e) => viewCommentHandler(request)}
            />
          );
        })}
      </div>
      {openComments && (
        <Comments
          onClose={(e) => viewCommentHandler()}
          selectedRequest={selectedRequest}
        />
      )}
    </>
  );
};

export default ScoreReview;
