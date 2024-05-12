import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';
import Layout from 'containers/Layout';
import Tables from 'components/Tables';
import { createUsersHandler, getUserRoles, getUsersList, makeUserActiveDeactive } from './actions';
import saga from './saga';
import reducer from './reducer';
import CreateUser from 'components/FTPForms/CreateUser';
import { staticManageUsersData } from './selectors';
import PageLoader from 'components/Loaders/PageLoader';

export function ManageUsers() {
  const dispatch = useDispatch();
  const [isCreateUserClicked, setUserButtonClick] = useState(false);
  const [isCreateAdminClicked, setAdminButtonClick] = useState(false);
  const [userTitle, setTitle] = useState('Create User');

  useInjectSaga({ key: 'manageuser', saga });
  useInjectReducer({ key: 'manageuser', reducer });
  const manageuser = useSelector(state => state.manageuser);

  const onCreateUser = title => {
    dispatch(getUserRoles(title));
    if (title == 'Create User') {
      setTitle(userTitle);
      setUserButtonClick(true);
      setAdminButtonClick(false);
    } else {
      setTitle(title);
      setUserButtonClick(false);
      setAdminButtonClick(true);
    }
  };

  const {
    staticUserTableData: { columns },
    staticCreateUserData,
  } = staticManageUsersData;
  const usersData = useSelector(state => {
    if (state && state.manageuser && state.manageuser.users) {
      return state.manageuser.users;
    }
  });

  var nameTitle = name => (
    <div>
      <p className="red_name">{name}</p>
    </div>
  );

  const toggleActiveUser = e => {
    const userActiveDeactiveMetaData = {
      status: e.currentTarget.innerText,
      userid: e.currentTarget.id,
    };
    e.currentTarget.innerText == 'Active'
      ? (dispatch(makeUserActiveDeactive(userActiveDeactiveMetaData)),
        (e.currentTarget.innerText = 'Inactive'),
        (e.currentTarget.className = 'btn btn-success btn_inactive'))
      : (dispatch(makeUserActiveDeactive(userActiveDeactiveMetaData)),
        (e.currentTarget.innerText = 'Active'),
        (e.currentTarget.className = 'btn btn-success btn_active'));
  };

  var userStatus = (userId, is_active) => {
    return (
      <button
        type="button"
        id={userId}
        className={`btn btn-success ${is_active ? 'btn_active' : 'btn_inactive'}`}
        onClick={e => toggleActiveUser(e)}>
        {is_active ? 'Active' : 'Inactive'}
      </button>
    );
  };

  const tableData = [];

  if (usersData != null && usersData != undefined) {
    if (Object.keys(usersData).length > 0) {
      let fulldate;
      if (usersData.results.length > 0) {
        usersData.results.map(user => {
          var localDate = new Date(user.last_login);

          if (user.last_login != null) {
            const date =
              localDate.getFullYear() +
              '-' +
              (localDate.getMonth() <= 9 ? '0' + (localDate.getMonth() + 1) : localDate.getMonth() + 1) +
              '-' +
              localDate.getDate();
            const time = localDate.getHours() + ':' + localDate.getMinutes();
            fulldate = date + ' ' + time;
          }

          const userMetaData = {
            user: nameTitle(user.first_name),
            type: user.type,
            role: user.role,
            lastlogin: user.last_login != undefined ? fulldate : '',
            status: userStatus(user.id, user.is_active),
          };
          tableData.push(userMetaData);
        });
      }
    }
  }

  return (
    <Layout>
      {useEffect(() => {
        dispatch(getUsersList());
      }, [])}
      {isCreateUserClicked || isCreateAdminClicked ? (
        <CreateUser title={userTitle} data={staticCreateUserData} createUsersHandler={createUsersHandler} />
      ) : (
        <div className="container mt-8">
          <section className="content">
            <div className="row">
              <div className="create_user_block">
                <button
                  type="button"
                  className="btn btn-success create_user_btn"
                  onClick={() => onCreateUser('Create User')}>
                  Create User
                </button>
                <button
                  type="button"
                  className="btn btn-defualt create_admin_btn"
                  onClick={() => onCreateUser('Create Admin')}>
                  Create Admin
                </button>
                {manageuser == undefined || (manageuser != undefined && manageuser.loading) ? (
                  <PageLoader text="Fetching Users List..." />
                ) : (
                  ''
                )}
              </div>
              <div className="box">
                <div className="box-body">
                  {manageuser && manageuser.data !== undefined && Object.keys(manageuser.data).length > 0 ? (
                    <Tables createUsersHandler={createUsersHandler} data={manageuser} />
                  ) : (
                    <Tables createUsersHandler={createUsersHandler} data={tableData} columns={columns} />
                  )}
                </div>
              </div>
            </div>
          </section>
          <style>{`
          .content {
            min-height: 250px;
            padding: 15px;
            margin-right: auto;
            margin-left: auto;
            padding-left: 15px;
            padding-right: 15px;
          }

          .mt-8 {
            margin-top:8%;
          }

          .create_user_block {
            margin-bottom: 30px;
            margin-top: 30px;
          }
          
          .create_user_btn {
            background-color: #6DC144 !important;
            border: 1px solid #6DC144 !important;
            color: #fff;
            text-transform: uppercase;
            margin: 0 10px;
            font-size: 12px;
            padding: 10px 20px;
          }
          
          .create_admin_btn {
            background-color: #fff;
            border: 1px solid #ccc !important;
            color: #000;
            text-transform: uppercase;
            margin: 0 10px;
            font-size: 12px;
            padding: 10px 20px;
          }
          
          .btn-success {
            background-color: #00a65a;
            border-color: #008d4c;
          }

          .btn {
            border-radius: 3px;
            -webkit-box-shadow: none;
            box-shadow: none;
            border: 1px solid transparent;
          }
          
          .box {
            position: relative;
            border-radius: 3px;
            background: #ffffff;
            border: 1px solid #ececec;
            margin-bottom: 20px;
            width: 100%;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
          }

          .box-body {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 3px;
            border-bottom-left-radius: 3px;
            padding: 10px;
          }

          .red_name {
            margin: 0px;
            color: #D2232A;
            font-weight:700;
            font-size:16px;
          }

          .mob_icon {
            font-size: 24px;
            margin-right: 5px;
            color: #D2232A;
          }

          .mail_icon {
            font-size: 20px;
            color: #D2232A;
          }
    `}</style>
        </div>
      )}
    </Layout>
  );
}

ManageUsers.propTypes = {
  profileData: PropTypes.object,
  getProfileData: PropTypes.func,
};

export default ManageUsers;
