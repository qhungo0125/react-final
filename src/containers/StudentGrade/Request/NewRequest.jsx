import { FormControl, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import { t } from 'i18next';
import React from 'react';

const NewRequest = (props) => {//types
  const { } = props;
  return (
    <div className='mb-4 border border-2 p-4 rounded'>
      <div style={{ maxWidth: "400px", marginInline: "auto" }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true, }}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true, }}
        />
        <div className='mt-2 d-flex gap-4 justify-content-center mt-4'>
          <FormControl >
            <InputLabel id="Composition" >Composition</InputLabel>
            <Select
              labelId="Composition"
              label="Composition"
              id='composition-select'
              sx={{ width: '170px' }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <div className='d-flex flex-column gap-2'>
            <TextField
              label="Actual Score"
              variant="outlined"
              size="normal"
              sx={{ maxWidth: "150px" }}
              InputLabelProps={{ shrink: true, }}
              InputProps={{ readOnly: true, }} />
            <TextField label="Expected Score" variant="outlined" size="normal" sx={{ maxWidth: "150px" }} InputLabelProps={{ shrink: true, }} />
          </div>
        </div>

        <TextField
          placeholder="Your explaination..."
          multiline
          rows={5}
          maxRows={20}
          fullWidth
          class="mt-4"
        />
      </div>
      <div className='mt-2 d-flex gap-4 justify-content-center'>
        <button className='btn btn-info'>
          Create
        </button>
      </div>
    </div >
  );
};

export default NewRequest;
