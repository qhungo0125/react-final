import React from 'react';
import { getClass, mapStudents } from '../../../api/admin';
import { useSearchParams } from 'react-router-dom';
import { downloadExcel, getDatafromUploadExcel } from '../../../utils/excel';
import { t } from 'i18next';

const GradeUpload = () => {
  const [students, setStudents] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getClassData = async () => {
      const classId = searchParams.get('id');
      try {
        setLoading(true);
        const response = await getClass({
          id: classId,
          fields: ['_id', 'email', 'name', 'mapCode'],
        });
        if (response && response.data) {
          setStudents(response.data.students);
          console.log(response.data.students);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getClassData();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const data = await getDatafromUploadExcel(file);
    setStudents(data);
  };

  const mapStudentsFromExcel = async (students) => {
    try {
      const data = await mapStudents({ students });
      alert('Success');
      // console.log(data);
    } catch (err) {
      alert('Error');
      console.error(err);
    } finally {
    }
  };

  return (
    <div className='w-50'>
      <h5>{t('label.download.template')}</h5>
      <div className='mt-4 d-flex gap-4 w-50'>
        <button
          className='btn btn-success'
          onClick={(e) => downloadExcel(students)}
        >
          {t('label.button.download')}
        </button>
      </div>
      <h5 className='mt-5'>{t('label.upload')}</h5>
      <div className='d-flex w-50 flex-column'>
        <div className='input-group'>
          <input
            type='file'
            className='form-control me-2'
            onChange={handleFileChange}
          />
          <button
            className='rounded btn btn-success'
            onClick={async (e) => {
              console.log('students ', students);
              await mapStudentsFromExcel(students);
            }}
          >
            {t('label.button.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradeUpload;
