import { t } from 'i18next';
import React from 'react';

const MappingForm = (props) => {
  const {
    heading,
    isOpen,
    setIsOpen,
    onMapping: handleSubmit = () => {},
    initMapcode,
  } = props;
  const [mapCode, setMapCode] = React.useState(initMapcode);

  return isOpen ? (
    <form
      style={{
        background: 'white',
        padding: '2rem 6rem',
        border: '1px solid #ccc',
        borderRadius: '1rem',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(mapCode);
      }}
    >
      <h4
        style={{
          marginBottom: '2rem',
          textAlign: 'center', // Center the heading text
        }}
      >
        {heading ? heading : 'Input Map Code'}
      </h4>

      <input
        style={{
          border: '1px solid #ccc',
          borderRadius: '0.5rem',
          // width: '80%',
          height: '2.5rem',
          fontSize: '1.5rem',
        }}
        type='text'
        value={mapCode}
        onChange={(e) => setMapCode(e.target.value)}
      />
      <div
        style={{
          margin: '2rem 1rem 0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <button className='btn btn-danger' onClick={(e) => setIsOpen(false)}>
          {t('label.button.close')}
        </button>

        <button type='submit' className='btn btn-success'>
          {t('label.button.confirm')}
        </button>
      </div>
    </form>
  ) : null;
};

export default MappingForm;
