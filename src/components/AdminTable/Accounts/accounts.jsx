import React from 'react';
import AccountItem from './accountItem';

const AccountsTable = (props) => {
  const { accounts = [], onBlock = () => {} } = props;
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Mapcode</th>
            <th>Name</th>
            <th>Email</th>
            <th>phone</th>
            <th>Address</th>
            <th>Role</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <AccountItem onBlock={onBlock} key={index} account={account} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsTable;
