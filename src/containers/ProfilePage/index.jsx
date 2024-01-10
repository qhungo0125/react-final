import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationAPI } from '../../api/authentication';
import { mappingStudent } from '../../api/admin';
import { useTranslation } from 'react-i18next';
import './profile.css';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [isFetching, setIsFetching] = React.useState(true);
  const [profile, setProfile] = React.useState({
    _id: '',
    mapCode: '',
    email: '',
    address: '',
    avatar: '',
    name: '',
    phone: '',
    role: '',
  });

  const changeField = React.useCallback((fieldname, value) => {
    setProfile((profile) => ({
      ...profile,
      [fieldname]: value,
    }));
  }, []);

  const navigate = useNavigate();

  React.useEffect(() => {
    const userId = localStorage.getItem('userid');
    if (!userId) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    const getData = async () => {
      try {
        setIsFetching(true);
        const result = await AuthenticationAPI.getUser({ userId });
        if (result.data) {
          setProfile(result.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [navigate]);

  return isFetching ? (
    <div>Loading...</div>
  ) : (
    <div className="d-flex justify-content-center align-items-center m-4">
      <form
        className="profileForm"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);
          console.log(data);
          try {
            if (data.mapCode === "") {
              const rs = await mappingStudent({ studentId: profile._id, mapCode: profile.mapCode })
            }

            setIsFetching(true);
            const result = await AuthenticationAPI.updateProfile(data);
            result.data && setProfile(result.data);

          } catch (error) {
            console.log(error);
            alert(error.message);
          } finally {
            setIsFetching(false);
          }
        }}
      >
        <div className="mb-3 text-center">
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt="Preview"
              className="img-fluid img-thumbnail"
            />
          )}
        </div>
        <div className="mb-3 d-flex justify-content-center row">
          <div className="d-flex justify-content-center">
            <input
              name="avatar"
              type="file"
              onChange={(e) => {
                setProfile((profile) => ({
                  ...profile,
                  avatar: e.target.files[0],
                }));
              }}
            />
            {/* <button onClick={(e) => {}}>Upload</button> */}
          </div>
        </div>

        {profile.role === "student" &&
          <div className="mb-3">
            <label className="form-label">{t('label.studentid')}</label>
            <input
              name="mapCode" // Add name attribute
              value={profile.mapCode}
              type="text"
              className="form-control"
              onChange={(e) => changeField('mapCode', e.target.value)}
            />
          </div>
        }

        <div className="mb-3">
          <label className="form-label">{t('label.email')}</label>
          <input
            name="email" // Add name attribute
            value={profile.email}
            type="email"
            className="form-control"
            onChange={(e) => changeField('email', e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('label.name')}</label>
          <input
            name="name" // Add name attribute
            value={profile.name}
            type="text"
            className="form-control"
            onChange={(e) => changeField('name', e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('label.address')}</label>
          <input
            name="address" // Add name attribute
            value={profile.address}
            type="text"
            className="form-control"
            onChange={(e) => changeField('address', e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('label.phone')}</label>
          <input
            name="phone" // Add name attribute
            value={profile.phone}
            type="text"
            className="form-control"
            onChange={(e) => changeField('phone', e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">{t('label.role')}</label>
          <p>{profile.role}</p>
        </div>

        <div className="d-flex justify-content-center">
          <button
            onClick={(e) => {
              navigate(-1);
            }}
            className="btn btn-primary m-4"
          >
            {t('label.goback')}
          </button>
          <button
            type="submit"
            disabled={isFetching}
            className="btn btn-primary m-4"
          >
            {!isFetching ? t('label.submit') : t('label.loading')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
