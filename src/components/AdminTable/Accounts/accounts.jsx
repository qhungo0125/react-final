import React from 'react';
import AccountItem from './accountItem';
import MappingForm from './mappingForm';
import { useTranslation } from 'react-i18next';

const AccountsTable = (props) => {
  const {
    selectedRole,
    accounts = [],
    onBlock = () => {},
    onMapping: handleMapping = () => {},
  } = props;
  const [isShow, setIsShow] = React.useState(false);
  const [selectedStudent, setStudent] = React.useState({});

  const { t } = useTranslation();

  return (
    <div className="position-relative">
      <div
        className={isShow ? 'table-responsive opacity-50' : 'table-responsive'}
      >
        <table className="table table-striped">
          <thead>
            <tr>
              {selectedRole === 'student' && <th>Mapcode</th>}
              <th>{t('label.name')}</th>
              <th>{t('label.email')}</th>
              <th>{t('label.phone')}</th>
              <th>{t('label.address')}</th>
              <th>{t('label.role')}</th>
              <th>{t('label.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <AccountItem
                selectedRole={selectedRole}
                setIsOpen={() => {
                  setIsShow(true);
                  setStudent(account);
                }}
                onBlock={onBlock}
                key={index}
                account={account}
              />
            ))}
          </tbody>
        </table>
      </div>
      {isShow && (
        <div
          className="rounded position-absolute top-50 start-50 translate-middle"
          style={{
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
            padding: '4px', // optional: add padding for a better visual
          }}
        >
          <MappingForm
            initMapcode={selectedStudent.mapCode || ''}
            isOpen={isShow}
            setIsOpen={setIsShow}
            onMapping={(mapcode) => {
              handleMapping({
                studentId: selectedStudent._id,
                mapCode: mapcode,
              });
              setIsShow(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AccountsTable;
