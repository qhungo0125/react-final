import React from 'react';
import { getClass, mappingStudent } from '../../../api/admin';
import { getClassScoreTypes } from '../../../api/scoreStructure';
import { getClassScores, setStudentScore } from '../../../api/scoreDetail';
import { useSearchParams } from 'react-router-dom';
import ScoreBoard from './ScoreBoard';
import EditScore from './EditScore';
import MappingForm from '../../../components/AdminTable/Accounts/mappingForm';

const GradeStudents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [students, setStudents] = React.useState([]);
  const [scoreTypes, setScoreTypes] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState({});
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [openMapForm, setOpenMapForm] = React.useState(false);

  React.useEffect(() => {
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
        const studentWithScoreType = rawStudents.data.students.map(
          (student) => {
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
          },
        );
        setStudents(studentWithScoreType);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
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

  return (
    <>
      <div className={openEditForm || openMapForm ? 'w-75 opacity-25' : 'w-75'}>
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
    </>
  );
};

export default GradeStudents;
