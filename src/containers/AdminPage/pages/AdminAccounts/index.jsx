import React from 'react';

const AdminAccounts = () => {
  return (
    <div className='table-responsive'>

    <table className="table table-striped">
      <thead>
        <tr >
          <th >Index</th>
          <th >First</th>
          <th >Last</th>
          <th >Handle</th>
          <th >Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr className='align-items-center' style={{verticalAlign: "middle"}}>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button type="button" class="btn btn-warning">
                Mapping
              </button>

              <button type="button" class="btn btn-danger">
                Block
              </button>
            </div>
          </td>
        </tr>
        <tr style={{verticalAlign: "middle"}}>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic mixed styles example"
            >
              <button type="button" class="btn btn-warning">
                Mapping
              </button>

              <button type="button" class="btn btn-danger">
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
