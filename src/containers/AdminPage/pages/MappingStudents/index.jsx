import React from 'react';
import useClasses from './state/useClasses';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useTranslation } from 'react-i18next';
import { downloadExcel, getDatafromUploadExcel } from '../../../../utils/excel';

const ClassNameCombobox = ({ selected, onSelect, values }) => {
  const { t } = useTranslation();
  if (values.length === 0) return null;
  return (
    <FormControl className='w-25'>
      <InputLabel>{t('admin.map.selectClass')}</InputLabel>
      <Select
        style={{
          height: '2.5rem',
        }}
        value={selected}
        label={t('admin.map.selectClass')}
        onChange={(e) => {
          onSelect(e.target.value);
        }}
      >
        {values.map((value) => (
          <MenuItem key={value._id} value={value._id}>
            {value.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const MappingStudents = () => {
  const {
    classes,
    loading,
    selectedClass,
    setSelectedClass,
    students,
    classInfo,
  } = useClasses();

  const [studentsExcel, setStudents] = React.useState(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const data = await getDatafromUploadExcel(file);
    setStudents(data);
  };

  return (
    <div>
      <h5>Download template</h5>
      <div className='mt-4 d-flex gap-4 w-50'>
        <ClassNameCombobox
          onSelect={(value) => {
            setSelectedClass(value);
          }}
          selected={selectedClass}
          values={classes}
        />
        <button
          className='btn btn-success'
          onClick={(e) => downloadExcel(students)}
        >
          Download Excel Template
        </button>
      </div>
      <h5 className='mt-5'>Upload</h5>
      <div className='d-flex w-50 flex-column'>
        <div className='input-group'>
          <input
            type='file'
            className='form-control me-2'
            onChange={handleFileChange}
          />
          <button className='rounded btn btn-success' onClick={(e) => {}}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MappingStudents;
