import React from 'react';
import { getClass, mappingStudent } from '../../../api/admin';
import { getClassScoreTypes, updateType } from '../../../api/scoreStructure';
import { getClassScores, setStudentScore } from '../../../api/scoreDetail';
import { useSearchParams } from 'react-router-dom';
import ScoreBoard from './ScoreBoard';
import EditScore from './EditScore';
import MappingForm from '../../../components/AdminTable/Accounts/mappingForm';
import { downloadExcel } from '../../../utils/excel';
import { t } from 'i18next';
import PublishForm from './PublishForm';

const GradeStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [students, setStudents] = React.useState([]);
  const [scoreTypes, setScoreTypes] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState({});
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [openMapForm, setOpenMapForm] = React.useState(false);
  const [openPublishForm, setOpenPublishForm] = React.useState(false);

  const getClassData = async () => {
    const classId = searchParams.get('id');
    try {
      let [rawStudents, scoresType, scores] = await Promise.all([
        getClass({
          id: classId,
          fields: ['_id', 'email', 'name', 'mapCode'],
        }),
        getClassScoreTypes({ classId }),
        getClassScores({ classId }),
      ]);

      setScoreTypes(scoresType.data);
      const studentWithScoreType = rawStudents.data.students.map((student) => {
        return {
          ...student,
          scoreTypes: scoresType.data.map((item) => {
            const value =
              scores.data.find(
                (score) =>
                  score.student._id === student._id &&
                  score.type.name === item.name,
              )?.value || 0;
            return {
              ...item,
              value,
            };
          }),
        };
      });
      setStudents(studentWithScoreType);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getClassData();
  }, [selectedStudent]);

  const onEditClick = ({ student }) => {
    setSelectedStudent(student);
    setOpenEditForm(true);
  };

  const onMapClick = ({ student }) => {
    setSelectedStudent(student);
    setOpenMapForm(true);
  };

  const onClose = () => {
    setOpenEditForm(false);
    setSelectedStudent({});
  };

  const editScoreValue = async ({ scores }) => {
    const studentId = selectedStudent._id;
    const teacherId = localStorage.getItem('userid');
    try {
      const response = await setStudentScore({
        studentId,
        teacherId,
        scores,
      });

      if (response && response.success) {
        alert('Edit score successfully');
        onClose();
      } else {
        alert('Edit score failed');
      }
    } catch (error) {}
  };

  const handleMapStudent = async (mapCode) => {
    try {
      const response = await mappingStudent({
        studentId: selectedStudent._id,
        mapCode,
      });
      if (response.success) {
        alert('Map student successfully');
        onCloseMapForm();
      } else {
        alert('Map student failed');
      }
    } catch (err) {
      console.error(err);
    } finally {
      onCloseMapForm();
    }
  };

  const onCloseMapForm = () => {
    setOpenMapForm(false);
    setSelectedStudent({});
  };

  const handlePublishSubmit = async (params) => {
    const { typeId } = params;
    try {
      const response = await updateType({ typeId, isPublish: true });
      alert('Publish score successfully');
      setOpenPublishForm(false);
    } catch (err) {
      alert('Publish score failed');
      console.error(err);
    } finally {
      getClassData();
    }
    return;
  };

  return (
    <>
      <div
        className={
          openEditForm || openMapForm || openPublishForm
            ? 'w-75 opacity-25'
            : 'w-75'
        }
      >
        <div className='d-flex gap-4'>
          <button
            className='btn btn-success'
            onClick={(e) => {
              const data = students.map((student) => {
                const extractedStudent = {
                  id: student._id,
                  mapCode: student.mapCode,
                  name: student.name,
                };
                student.scoreTypes.forEach((scoreType) => {
                  extractedStudent[scoreType.name] = scoreType.value;
                });

                return extractedStudent;
              });
              downloadExcel(data);
            }}
          >
            {t('label.export.excel')}
          </button>
          <button
            onClick={(e) => {
              setOpenPublishForm(true);
            }}
            className='btn btn-success'
          >
            {t('label.score.publish')}
          </button>
        </div>
        <ScoreBoard
          students={students}
          scoreTypes={scoreTypes}
          onEditClick={onEditClick}
          onMapClick={onMapClick}
        />
      </div>
      {openEditForm && (
        <EditScore
          selected={selectedStudent}
          onClose={onClose}
          editScoreValue={editScoreValue}
        />
      )}
      {openMapForm && (
        <MappingForm
          heading={selectedStudent.name}
          initMapcode={selectedStudent.mapCode}
          isOpen={true}
          setIsOpen={setOpenMapForm}
          onMapping={handleMapStudent}
        />
      )}
      {openPublishForm && (
        <PublishForm
          onClose={(e) => setOpenPublishForm(false)}
          onSubmit={handlePublishSubmit}
          scoreTypes={scoreTypes}
        />
      )}
    </>
  );
};

export default GradeStudents;
