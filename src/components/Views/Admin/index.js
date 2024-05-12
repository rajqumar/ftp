import React from 'react';
import Statistics from 'components/Cards/Statistics';
import Graph from 'components/BoxTypes/Graph';
import { RatingList } from 'components/BoxTypes/RatingList';
import Link from 'next/link';
import Stats from 'components/BoxTypes/Stats';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Tables from 'components/Tables';
import { useRouter } from 'next/router';

export function Admin(props) {
  const {
    buyerData: {
      buyer_statistics,
      buyer_datasheet,
      buyer_ratings,
      buyer_yeartodate,
      buyer_table: {
        compData: { columns, values },
      },
    },
    sellerData: {
      seller_statistics,
      seller_datasheet,
      seller_ratings,
      seller_yeartodate,
    },
  } = props;

  const router = useRouter();
  const role = useSelector(state => state.layout);
  var color = '#F0F0F0';

  if ((role && role.role !== undefined && role.role === 'buyer') || router.pathname == '/dashboard/buyer') {
    color = '#FFFFD7';
  } else if ((role && role.role !== undefined && role.role === 'seller') || router.pathname == '/dashboard/seller') {
    color = '#D3EFFF';
  } else if (role && role.role !== undefined && role.role === 'admin' && router.pathname == '/dashboard/buyer') {
    color = '#FFFFD7';
  }

  if (role && role.role !== undefined && role.role === 'seller' && router.pathname == '/dashboard/buyer') {
    color = '#D3EFFF';
  }

  if (role && role.role !== undefined && role.role === 'buyer' && router.pathname == '/dashboard/seller') {
    color = '#FFFFD7';
  }

  if (role && role.role !== undefined && role.role == 'admin' && router.pathname == '/dashboard/manager') {
    // statistics.heading = 'Buyer Statistics';
  } else if (role && role.role !== undefined && role.role == 'buyer' && router.pathname == '/dashboard/manager') {
    color = '#FFFFD7';
  }

  return (
    <div className="wrapper" style={{ background: color }}>
      <div className="mt-11">
        <div className="container">
          <section className="content">
            {role &&
            role.role !== undefined &&
            (role.role == 'buyer' || (role.role == 'admin' && router.pathname == '/dashboard/buyer')) ? (
              <Statistics data={buyer_statistics} />
            ) : role &&
              role.role !== undefined &&
              (role.role == 'seller' || (role.role == 'admin' && router.pathname == '/dashboard/seller')) ? (
              <Statistics data={seller_statistics} />
            ) : role && role.role !== undefined ? (
              <React.Fragment>
                <Statistics data={buyer_statistics} />
                <Statistics data={seller_statistics} />
              </React.Fragment>
            ) : (
              ''
            )}
          </section>
        </div>
        <div className="block_all">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                {role &&
                role.role !== undefined &&
                (role.role == 'buyer' ||
                  role.role == 'seller' ||
                  router.pathname == '/dashboard/buyer' ||
                  router.pathname == '/dashboard/seller') ? (
                  role && role.role !== undefined && role.role == 'buyer' && router.pathname == '/dashboard/seller' ? (
                    ((buyer_datasheet.heading = 'Purchase orders'), (<Graph data={buyer_datasheet} />))
                  ) : (
                    <Graph data={buyer_datasheet} />
                  )
                ) : (
                  <React.Fragment>
                    <Graph data={buyer_datasheet} />
                    <Graph data={seller_datasheet} />
                  </React.Fragment>
                )}
              </div>
              <div className="col-md-4">
                {role &&
                role.role !== undefined &&
                (role.role == 'buyer' || (role.role == 'admin' && router.pathname == '/dashboard/buyer')) ? (
                  <React.Fragment>
                    <RatingList data={buyer_ratings} />
                    <Stats data={buyer_yeartodate} />
                  </React.Fragment>
                ) : role &&
                  role.role !== undefined &&
                  (role.role == 'seller' || (role.role == 'admin' && router.pathname == '/dashboard/seller')) ? (
                  <React.Fragment>
                    <RatingList data={seller_ratings} />
                    <Stats data={seller_yeartodate} />
                  </React.Fragment>
                ) : role && role.role !== undefined ? (
                  <React.Fragment>
                    <RatingList data={buyer_ratings} />
                    <Stats data={buyer_yeartodate} />
                  </React.Fragment>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          {role && role.role !== undefined && role.role == 'admin' && router.pathname == '/dashboard/manager' ? (
            <div className="container create_user_block">
              <Link href="#">
                <button type="button" className="btn btn-success create_user_new">
                  Create User
                </button>
              </Link>
              <Tables data={values} columns={columns} />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <style>{`
    .wrapper {
      height: 50%;
      position: relative;
      overflow-x: hidden;
      overflow-y: auto;
    }
    
    .create_user_block {
      margin-bottom: 30px;
      margin-top: 30px;
    }

    .create_user_new {
      background: #6DC144;
      border: 1px solid #6DC144;
      padding: 10px 60px;
      margin-bottom: 20px;
    }

    .mt-11 {
      margin-top: 150px;
    }
    .box-body {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
      padding: 10px;
    }`}</style>
    </div>
  );
}

Admin.propTypes = {
  buyerData: PropTypes.shape({
    buyer_statistics: PropTypes.object,
    buyer_datasheet: PropTypes.object,
    buyer_ratings: PropTypes.object,
    buyer_yeartodate: PropTypes.object,
    buyer_table: PropTypes.shape({
      compData: PropTypes.shape({
        columns: PropTypes.array,
        values: PropTypes.array,
      }),
    }),
  }),
  sellerData: PropTypes.shape({
    seller_statistics: PropTypes.object,
    seller_datasheet: PropTypes.object,
    seller_ratings: PropTypes.object,
    seller_yeartodate: PropTypes.object,
  }),
};

export default Admin;
