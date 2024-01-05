import React from 'react';

const EditForm = (props) => {
  const { onClose, selectedType, onSubmit: handleSubmit = () => {} } = props;
  const [typeUpdate, setTypeUpdate] = React.useState({
    typeId: selectedType._id,
    name: selectedType.name,
    percentage: selectedType.percentage,
  });
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
        <h5>Edit score structure</h5>

        <div className='d-flex justify-content-between align-items-center mt-4 mb-4'>
          <h6>Name</h6>
          <input
            className='w-100'
            style={{
              border: '1px solid #ccc',
              borderRadius: '0.5rem',
              height: '2.5rem',
              fontSize: '1.5rem',
            }}
            type='text'
            value={typeUpdate.name}
            onChange={(e) =>
              setTypeUpdate((current) => ({
                ...current,
                name: e.target.value,
              }))
            }
          />
        </div>

        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h6>Percentage</h6>
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
            value={typeUpdate.percentage}
            onChange={(e) =>
              setTypeUpdate((current) => ({
                ...current,
                percentage: e.target.value,
              }))
            }
          />
        </div>

        <div className='d-flex justify-content-center gap-4'>
          <button onClick={onClose} className='btn btn-danger'>
            close
          </button>
          <button
            onClick={async (e) => {
              console.log(typeUpdate);
              await handleSubmit(typeUpdate);
            }}
            className='btn btn-success'
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
