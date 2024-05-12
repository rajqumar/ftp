import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';

function Tables(props) {
  var { data, columns } = props;

  const customStyles = {
    table: {
      style: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#f4f4f4',
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: 800,
      },
    },
  };

  return (
    <div className="table-responsive">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        noHeader={true}
        paginationDefaultPage={1}
        striped={true}
        responsive={true}
        disabled={false}
      />
      <style>
        {`
          .table-responsive {
            min-height: .01%;
            overflow-x: auto;
          }

          .btn_inactive {
            background-color: #D31E25 !important;
            border: 1px solid #D31E25 !important;
            border-radius: 50px !important;
            font-size: 14px;
            padding: 0px 15px;
          }
          .btn_active {
            background-color: #6DC144 !important;
            border: 1px solid #6DC144 !important;
            border-radius: 50px !important;
            font-size: 14px;
            padding: 0px 20px;
          }
          .rdt_Pagination {
            display: flex ;
          }
    `}
      </style>
    </div>
  );
}

Tables.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  options: PropTypes.object,
};

export default Tables;
