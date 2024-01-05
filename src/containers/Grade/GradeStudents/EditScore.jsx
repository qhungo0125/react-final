import React from 'react';

const EditScore = (props) => {
  const {
    selected: data,
    onClose: handleClose = () => {},
    editScoreValue = () => {},
  } = props;
  const { name, mapCode, scoreTypes } = data;
  const [scores, setScores] = React.useState(scoreTypes);
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
          width: '15%',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 1,
          textAlign: 'center',
        }}
      >
        <h4 className='mb-4'>{`${mapCode} - ${name}`}</h4>
        {scores.map((scoreType) => {
          return (
            <div
              key={scoreType._id}
              className='d-flex justify-content-between align-items-center mb-2'
            >
              <h6>{scoreType.name}</h6>
              <input
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '0.5rem',
                }}
                value={scoreType.value}
                type='number'
                min={0}
                max={10}
                onChange={(e) => {
                  setScores((current) => {
                    return current.map((item) => {
                      if (item._id === scoreType._id) {
                        return {
                          ...item,
                          value: e.target.value,
                        };
                      }
                      return item;
                    });
                  });
                }}
              />
            </div>
          );
        })}

        <div className='d-flex justify-content-center gap-4'>
          <button onClick={handleClose} className='btn btn-danger'>
            close
          </button>
          <button
            onClick={async (e) => {
              const scoreParams = scores.map((item) => ({
                typeId: item._id,
                value: item.value,
              }));
              console.log(scoreParams);
              await editScoreValue({ scores: scoreParams });
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

export default EditScore;
