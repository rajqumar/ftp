import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import Layout from 'containers/Layout';
import ProfileView from 'components/Views/Profile';

import saga from './saga';
import reducer from './reducer';

import { getProfileData, updateProfileHandler } from './actions';
import { selectProfileData } from './selectors';

export function Profile() {
  useInjectSaga({ key: 'profile', saga });
  useInjectReducer({ key: 'profile', reducer });

  var profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile === undefined || profile.data === undefined || Object.keys(profile.data).length <= 0)
      dispatch(getProfileData());
  });

  return (
    <Layout>
      <div className="container">
        <section className="content">
          {profile && profile.data !== undefined && Object.keys(profile.data).length > 0 ? (
            <div className="row">
              <div className="col-md-6 col-md-offset-3 reg_form_new">
                <ProfileView updateProfileHandler={updateProfileHandler} profile={profile} />
              </div>
            </div>
          ) : (
            <center style={{ margin: '340px 0px 340px 0px' }}>
              <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'rgba(37, 32, 32, 1) !important',
                  fontSize: '12px !important',
                  marginTop: '10px',
                }}>
                {' '}
                Fetching Profile Data...
              </p>
            </center>
          )}
        </section>
      </div>
    </Layout>
  );
}

Profile.propTypes = {
  profileData: PropTypes.object,
  getProfileData: PropTypes.func,
};

export default Profile;
