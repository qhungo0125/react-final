import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { t } from 'i18next';

const StructuresCombobox = ({ values, selected, onSelect }) => {
  return (
    <FormControl className='w-50'>
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
  const { onClose, onSubmit: handleSubmit = () => {} } = props;
  const [typeName, setTypeName] = React.useState('');
  const [percentage, setPercentage] = React.useState();

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 999,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className='rounded position-absolute p-4 border border-2 bg-white'
        style={{
          width: '25%',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 1,
          textAlign: 'center',
        }}
      >
        <h5>{t('label.add.score')}</h5>

        <div className='d-flex justify-content-between align-items-center mt-4 mb-4'>
          <h6>{t('label.add.score.name')}</h6>
          <input
            style={{
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              height: '2.5rem',
              fontSize: '1.5rem',
            }}
            type='text'
            placeholder='Type name'
            onChange={(e) => setTypeName(e.target.value)}
          />
        </div>

        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h6>{t('label.percentage')}</h6>
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
        </div>

        <div className='d-flex justify-content-center gap-4'>
          <button onClick={onClose} className='btn btn-danger'>
            {t('label.button.close')}
          </button>
          <button
            onClick={async (e) => {
              await handleSubmit({ name: typeName, percentage });
            }}
            className='btn btn-success'
          >
            {t('label.button.add')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
