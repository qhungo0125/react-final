import React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSearchParams } from 'react-router-dom';
import { getClassReviews, sendChatContent } from '../../../api/review';
import { MenuContext } from '../../../context/MenuContext';
import Comment from './Comment';
import Request from './Request';
import NewRequest from './NewRequest';
import { useParams } from 'react-router-dom';

const RequestList = ({ rows, scores }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [requests, setRequests] = React.useState([]);
  const [selectedRequest, setSelectedRequest] = React.useState({});
  const [openComments, setOpenComments] = React.useState(false);
  const [openRequest, setOpenRequest] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const menuContext = React.useContext(MenuContext);
  const { classId } = useParams();
  

  const getData = async () => {
    const studentId = localStorage.getItem('userid')
    const requests = await getClassReviews({ classId });
    if (requests.success && requests.data && requests.data.length > 0) {
      const student_requests = requests.data.filter(rq => rq.student._id === studentId)
      return student_requests;
      //return requests.data;
    }
    return [];
  };

  React.useEffect(() => {
    const getInitData = async () => {
      const data = await getData();
      setRequests(data);
    };
    getInitData();
  }, [reload]);

  console.log()

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

  const handleAddRequestBtnClick = () => {
    setOpenRequest(prev => !prev)
  }

  const reloadRequest = () => {
    setReload(prev => !prev)
  }

  return (
    <>
      <Box sx={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
        <IconButton
          color='primary'
          size='large'
          onClick={handleAddRequestBtnClick}
        >
          <AddIcon />
        </IconButton>
      </Box>
      {
        openRequest &&
        <NewRequest closeForm={handleAddRequestBtnClick} rows={rows} scores={scores} reloadRequest={reloadRequest}/>
      }
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
        <Comment
          onClose={(e) => viewCommentHandler()}
          selectedRequest={selectedRequest}
          onSendChat={(params) => sendChat(params)}
        />
      )}
    </>
  );
};

export default RequestList;
