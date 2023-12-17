import * as React from 'react';
import { Button, Box, TextField, Typography } from '@mui/material';

export default function MultilineTextFields() {
  const [comments, setComments] = React.useState([]);
  const [text, setText] = React.useState("");
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    //fetch comments
  }, [])

  const handleSendClick = () => {
    //send comments to server

    //set state
    if (text != "") {
      setComments(prev => [...prev, { author: "Me: ", content: text }])
      setText("")
    }
    inputRef.current.focus()
  }

  return (
    <Box>
      <Box>
        {
          comments.map((comment) => (
            <Typography variant="subtitle1" gutterBottom>
              <span style={{ fontWeight: '600' }}>{comment.author}</span>
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
          gap: '10px',
          alignItems:'baseline'
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
          inputRef={inputRef}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{lineHeight:'initial !important'}}>
          <Button variant="contained" size='normal' disableRipple onClick={handleSendClick}>
            Send
          </Button>
        </div>

      </Box>
    </Box>

  );
}