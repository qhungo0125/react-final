import React from 'react';
import ResponsiveDrawer from '../components/Drawer';
import { Container } from '@mui/material';
import DashBoard from './Dashboard';
import Stream from './Stream';
import People from './People';
import AddClass from './AddClass';
import Detail from './Grade/Detail';
import Reviews from './Grade/Review';
import Structure from './Grade/Structure';
import StudentGrade from './StudentGrade';

import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';
import GradeStructure from './Grade/Structure/v2';
import GradeUpload from './Grade/Upload/GradeUpload';
import GradeStudents from './Grade/GradeStudents/GradeStudents';
import ScoreReview from './Grade/Review/v2';

const identifyTabs = () => {
  const menuContext = useContext(MenuContext);

  var tab;
  if (menuContext.displayClassTab) {
    var currentClassTab = menuContext.classTab;
    switch (currentClassTab) {
      case 'stream':
        tab = <Stream />;
        break;
      case 'people':
        tab = <People />;
        break;
      // case 'grade_detail':
      //   tab = <Detail />;
      //   break;
      case 'grade_structure':
        tab = <GradeStructure />;
        break;
      case 'grade_review':
        tab = <ScoreReview />;
        break;
      case 'grade_upload':
        tab = <GradeUpload />;
        break;
      case 'grade_students':
        tab = <GradeStudents />;
        break;
      case 'grade': //student grade
        tab = <StudentGrade />;
        break;
      default:
        tab = <Stream />;
        break;
    }
  } else {
    switch (menuContext.tab) {
      case 'home':
        tab = <DashBoard />;
        break;
      case 'add_class':
        tab = <AddClass />;
        break;
      default:
        tab = <DashBoard />;
        break;
    }
  }

  return tab;
};

const Page = () => {
  return (
    <div>
      {
        <ResponsiveDrawer>
          <Container
            sx={{
              mt: { xs: 6, sm: 0 },
              background: 'white',
              borderRadius: 4,
              paddingY: 2,
              '&.MuiContainer-root': {
                maxWidth: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
              },
            }}
          >
            {/* <DashBoard /> */}
            {identifyTabs()}
          </Container>
        </ResponsiveDrawer>
      }
    </div>
  );
};

export default Page;
