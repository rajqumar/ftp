import { createSelector } from 'reselect';
import { initialState } from './reducer';

const staticManageUsersData = {
  staticUserTableData: {
    columns: [
      {
        name: 'User',
        selector: 'user',
        minWidth: '200px',
        sortable: true,
      },
      {
        name: 'Type',
        selector: 'type',
        sortable: true,
        minWidth: '200px',
      },
      {
        name: 'Role',
        selector: 'role',
        sortable: true,
        minWidth: '200px',
      },
      {
        name: 'LastLogin',
        selector: 'lastlogin',
        sortable: true,
        minWidth: '250px',
      },
      {
        name: 'Status',
        selector: 'status',
        sortable: true,
        minWidth: '50px',
      },
    ],

    options: {
      filterType: 'dropdown',
      pagination: false,
      filter: true,
      download: false,
      print: false,
      viewColumns: false,
      toolbar: false,
      filterTable: false,
    },
  },

  staticCreateUserData: {
    dropdownData: [
      { value: 'Select Role', name: 'Select Role' },
      { value: 'IT Manager', name: 'IT Manager' },
      { value: 'Procurement Manager', name: 'Procurement Manager' },
      { value: 'Procurement Lead', name: 'Procurement Lead' },
      { value: 'Executive Assistant', name: 'Executive Assistant' },
    ],
    basic_info: {
      first_name: 'John',
      last_name: 'Doe',
      title: 'Director',
      password: 'Leave blank if unchanged',
      email: 'john@gmail.com',
      phone: '6567891234',
    },
  },
};

const selectUsersData = state =>
  state && state.data !== undefined ? state.data : staticManageUsersData || initialState.data;

const usersData = () => createSelector(selectUsersData, subState => subState);

export { usersData, selectUsersData, staticManageUsersData };
