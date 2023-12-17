import * as React from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';

export default function MultilineTextFields() {
  const [comments, setComments] = React.useState([]);
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    //fetch comments
  }, [])



  const handleSendClick = () => {
    //send comments to server

    //set state
    setComments(prev => [...prev, { author: "Me: ", content: text }])
    setText("")
  }

  console.log(comments)

  return (
    <Box>
      <Box>
        {
          comments.map((comment) => (
            <Typography variant="subtitle1" gutterBottom>
              <span style={{fontWeight:'600'}}>{comment.author}</span>
              {comment.content}
            </Typography>
          ))
        }
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { width: '100%' },
          display: 'flex',
          gap: '10px'
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-multiline-flexible"
          multiline
          size='small'
          placeholder='Aa'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="contained" size='small' disableRipple onClick={handleSendClick}>
          Send
        </Button>
      </Box>
    </Box>

  );
}