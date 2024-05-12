import React from 'react';
import Statistics from 'components/Cards/Statistics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faCalendar } from '@fortawesome/free-solid-svg-icons';
import Graph from 'components/BoxTypes/Graph';
import { RatingList } from 'components/BoxTypes/RatingList';
import YearToDate from 'components/BoxTypes/YearToDate';
import PropTypes from 'prop-types';
import Plain from '../../Input';

export function User(props) {
  const {
    staticData: { statisticsData, datasheet, ratings, YearToDateDummy, dropdownData },
    color,
  } = props;
  const handleChange = () => true;

  return (
    <div className="wrapper">
      <div className="bg-color mt-11">
        <div className="container">
          <section className="content">
            <Statistics data={statisticsData} title="Your Procurement Journey" link="#" />
          </section>
        </div>
        <div className="block_all">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="box">
                  <div className="box-header with-border">
                    <h3 className="box-title">
                      <FontAwesomeIcon icon={faChartBar} width="12" />
                      &nbsp; Purchase Orders
                    </h3>
                    <div className="box-tools pull-right">
                      <Plain
                        data={{
                          dropdownData: dropdownData,
                          onChange: handleChange,
                          type: 'dropdown',
                          name: 'role',
                          defaultOption: 'Select role',
                        }}
                      />
                    </div>
                    <Graph data={datasheet} />
                  </div>
                  <div className="box-body">
                    <div id="app"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <RatingList data={ratings} title={'Buyer rating'} />
                <YearToDate data={YearToDateDummy} icon={faCalendar} title="Year to Date" dynamicClass="col-md-4" />
              </div>
            </div>
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
    
    .bg-color {
        background-color: ${color};
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
    </div>
  );
}

User.propTypes = {
  color: PropTypes.string,
  staticData: PropTypes.object,
};

export default User;
