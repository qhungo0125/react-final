import { FormControl, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import { createRequest } from '../../../api/review';
import { t } from 'i18next';
import React from 'react';

const NewRequest = ({ closeForm, rows, scores, reloadRequest }) => {//types
  const [form, setForm] = React.useState({
    title: '',
    composition: '',
    actual_score: '',
    expected_score: '',
    explain: ''
  })

  const [compositions, setCompositions] = React.useState(rows.filter(row => row.grade !== ""))

  const handleChangeText = (props) => {
    const { field, value } = props
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleCompositionChange = (props) => {
    const { field, value } = props
    console.log(value)
    const actualScore = (compositions.filter(row => row.id === value))[0].grade
    setForm(prev => ({
      ...prev, [field]: value, 'actual_score': actualScore
    }))
  }

  console.log(form)

  const hanleCreateRequest = async () => {
    const studentId = localStorage.getItem('userid')
    const score = scores.filter(item => item.student._id === studentId && item.type._id === form.composition)
    await createRequest({
      title: form.title,
      explain: form.explain,
      actualScore: form.actual_score,
      expectedScore: form.expected_score,
      studentId: studentId,
      teacherId: score[0].teacher._id,
      classId: score[0].type.class._id,
      scoreId: score[0]._id,
    })
    closeForm();
    reloadRequest();
  }

  console.log(compositions)

  return (
    <div className='mb-4 border border-2 p-4 rounded'>
      <div style={{ maxWidth: "350px", marginInline: "auto" }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true, }}
          sx={{ marginBottom: '10px' }}
          size='small'
          value={form.title}
          required
          onChange={(e) => handleChangeText({ field: 'title', value: e.target.value })}
        />
        <div className='mt-2 d-flex gap-4 justify-content-center mt-4'>
          <FormControl >
            <InputLabel id="Composition" size='small' required >Composition</InputLabel>
            <Select
              labelId="Composition"
              label="Composition"
              id='composition-select'
              sx={{ width: '170px', '& .MuiList-root': { maxHeight: '170px' } }}
              size='small'
              value={form.composition}
              required
              onChange={(e) => handleCompositionChange({ field: 'composition', value: e.target.value })}
            >
              {
                compositions.map((row, index) => (
                  <MenuItem key={index} value={row.id}>{row.type}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <div className='d-flex flex-column gap-2'>
            <TextField
              label="Actual Score"
              variant="outlined"
              size="small"
              sx={{ maxWidth: "150px" }}
              InputLabelProps={{ shrink: true, }}
              InputProps={{ readOnly: true, }}
              value={form.actual_score}
              required
              onChange={(e) => handleChangeText({ field: 'actual_score', value: e.target.value })}

            />
            <TextField
              label="Expected Score"
              variant="outlined"
              size="small"
              sx={{ maxWidth: "150px" }}
              InputLabelProps={{ shrink: true, }}
              value={form.expected_score}
              required
              onChange={(e) => handleChangeText({ field: 'expected_score', value: e.target.value })}

            />
          </div>
        </div>

        <TextField
          placeholder="Your explaination..."
          multiline
          rows={5}
          maxRows={20}
          fullWidth
          className="mt-4"
          size='small'
          value={form.explain}
          required
          onChange={(e) => handleChangeText({ field: 'explain', value: e.target.value })}

        />
      </div>
      <div className='mt-2 d-flex gap-4 justify-content-center'>
        <button className='btn btn-light' onClick={closeForm}>
          Cancel
        </button>
        <button className='btn btn-info' onClick={hanleCreateRequest}>
          Create
        </button>
      </div>
    </div >
  );
};

export default NewRequest;
