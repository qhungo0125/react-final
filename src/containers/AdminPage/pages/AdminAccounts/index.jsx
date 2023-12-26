import React from 'react';
import useStudents from './state/useStudents';
import useTeachers from './state/useTeachers';

const AdminAccounts = () => {
  const { students } = useStudents();
  const { teachers } = useTeachers();
  console.log(students, teachers);
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Index</th>
            <th>First</th>
            <th>Last</th>
            <th>Handle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="align-items-center"
            style={{ verticalAlign: 'middle' }}
          >
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <button type="button" className="btn btn-warning">
                  Mapping
                </button>

                <button type="button" className="btn btn-danger">
                  Block
                </button>
              </div>
            </td>
          </tr>
          <tr style={{ verticalAlign: 'middle' }}>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <button type="button" className="btn btn-warning">
                  Mapping
                </button>

                <button type="button" className="btn btn-danger">
                  Block
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminAccounts;
