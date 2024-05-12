import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Tables from 'components/Tables';

export function TransactionList(props) {
  const { data, columns, createButton } = props;
  const router = useRouter();

  const [filterText, setFilterText] = React.useState('');

  const filteredItems = data.filter(
    item =>
      (item.supplier && item.supplier.toLowerCase().includes(filterText.toLowerCase())) || (item.seller && item.seller.toLowerCase().includes(filterText.toLowerCase())) || (item.customer && item.customer.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.rfq_id && item.rfq_id.toLowerCase().includes(filterText.toLowerCase()))
  );

  const onFilter = e => setFilterText(e.target.value);
  return (
    <React.Fragment>
        { createButton ? (
            <button className="btn btn-success create_user_new" type="button" onClick={() => router.push('/rfq/buy/create')}>
                CREATE RFQ
            </button> ):
            null
        }

      <div className="clearfix"></div>
      <div className="col-md-12 pa-0 mb-20">
        <h5 className="combine_head">Filter</h5>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search "
            aria-label="Recipient's username"
            value={filterText}
            onChange={onFilter}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faSearch} width="16" />
            </span>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
      <div className="box box-widget">
        <div className="box-body">
          <Tables columns={columns} data={filteredItems} />
        </div>
      </div>
      <style>{`
        .box-widget {
            border: 1px solid #e1dede;
            position: relative;
        } 
        .box-body {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 3px;
            border-bottom-left-radius: 3px;
            padding: 10px;
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
        .create_user_new {
            background: #6DC144;
            border: 1px solid #6DC144;
            padding: 10px 60px;
            margin-bottom: 20px;
        }  
        .combine_head {
            text-align: left;
            font-size: 24px;
            font-weight: 700;
        }
        .pa-0 {
            padding-left: 0px !important;
            padding-right: 0px !important;
        }
        .mb-20 {
            margin-bottom: 20px !important;
            margin-top: 20px !important;
        }
        .input-group {
            position: relative;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            -ms-flex-align: stretch;
            align-items: stretch;
            width: 320px !important;
        }
        
        .input-group>.form-control:not(:last-child) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        .input-group-append, .input-group-prepend {
            display: -ms-flexbox;
            display: flex;
            margin-left: -1px;
        }
        .input-group>.input-group-append>.input-group-text{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    `}</style>
    </React.Fragment>
  );
}

TransactionList.propTypes = {
  t: PropTypes.func,
  getProfileData: PropTypes.func,
  data: PropTypes.object,
  onGetShowcases: PropTypes.func,
  columns: PropTypes.object,
  createButton: PropTypes.bool,
};

export default TransactionList;
