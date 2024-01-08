import React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { t } from 'i18next';

const TypeStatus = ({ selected, onSelect, scoreTypes }) => {
  return (
    <FormControl fullWidth>
      <Select
        value={selected.name}
        onChange={(e) => {
          onSelect(e.target.value);
        }}
      >
        {scoreTypes
          .filter((i) => !i.isPublish)
          .map((scoreType) => (
            <MenuItem key={scoreType._id} value={scoreType.name}>
              {scoreType.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

const PublishForm = (props) => {
  const { onClose, onSubmit, scoreTypes } = props;
  const [selected, setSelected] = React.useState(scoreTypes[0]);

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
        <div>
          <h4 className='mb-4 text-uppercase'>{t('label.publish.score')}</h4>
          <div className='mb-4 d-flex gap-4'>
            <label className='form-label'>{t('label.select.score.type')}</label>
            <TypeStatus
              onSelect={(value) => {
                setSelected(
                  scoreTypes.find((scoreType) => scoreType.name === value),
                );
              }}
              selected={selected}
              scoreTypes={scoreTypes}
            />
          </div>
          <div className='d-flex justify-content-center gap-4 '>
            <button onClick={(e) => onClose()} className='btn btn-danger'>
              {t('label.button.close')}
            </button>
            <button
              onClick={async (e) => {
                if (!selected.isPublish) {
                  await onSubmit({ typeId: selected._id });
                } else {
                  alert('Already published');
                }
              }}
              className='btn btn-success'
            >
              {t('label.button.confirm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishForm;
