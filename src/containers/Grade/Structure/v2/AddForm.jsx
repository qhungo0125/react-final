import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const StructuresCombobox = ({ values, selected, onSelect }) => {
  return (
    <FormControl fullWidth>
      <Select
        value={selected.name}
        onChange={(e) => {
          onSelect(e.target.value);
        }}
      >
        {values.map((value) => {
          return (
            <MenuItem key={value._id} value={value.name}>
              {value.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const AddForm = (props) => {
  const { onClose, scoreTypes } = props;
  const [typeName, setTypeName] = React.useState('');
  const [percentage, setPercentage] = React.useState(0);

  if (!scoreTypes || scoreTypes.length === 0) {
    return null;
  }

  if (scoreTypes && scoreTypes.length > 0 && typeName === '') {
    setTypeName(scoreTypes[0].name);
    console.log('setTypeName', scoreTypes[0].name);
    return null;
  }

  console.log('typeName', typeName);

  return (
    <div>
      <StructuresCombobox
        values={scoreTypes}
        selected={typeName}
        onSelect={(value) => {
          setTypeName(value);
        }}
      />
      <input
        style={{
          border: '1px solid #ccc',
          borderRadius: '0.5rem',
          height: '2.5rem',
          fontSize: '1.5rem',
        }}
        min={0}
        max={100}
        type='number'
        value={percentage}
        onChange={(e) => setPercentage(e.target.value)}
      />
      <button onClick={onClose} className='btn btn-danger'>
        close
      </button>
      <button onClick={async () => {}} className='btn btn-success'>
        add
      </button>
    </div>
  );
};

export default AddForm;
