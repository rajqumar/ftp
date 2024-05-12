import React from 'react';
import withBox from 'components/Box';
import PropTypes from 'prop-types';

export function Stats(props) {
  const {
    data: { compData },
  } = props;
  return (
    <React.Fragment>
      <div className="box-tools pull-right  yeardrop">
        <div className="form-group">
          <select className="form-control select2 putwidth">
            <option value="default">2019 &nbsp;&nbsp;&nbsp;</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
          </select>
        </div>
      </div>
      {compData.map((stats, i) => (
        <div className="col-md-4" key={i}>
          <center>
            <div>
              <p className="quote_side">{stats.number}</p>
              <p className="qoute_sent">{stats.title}</p>
            </div>
          </center>
        </div>
      ))}

      <style>{`
                p {
                    font-size: 14px;
                    font-weight: 500;
                }
               .qoute_sent
                {
                  font-size: 14px;
                  font-weight: 400;
                }
                .quote_side {
                    margin-bottom: 0px;
                    font-size: 34px;
                    font-weight:400;
                }

                .box-tools {
                  position: absolute;
                  right: 10px;
                  top: 5px;
                }

                .pull-right {
                  float: right!important;
                }

            `}</style>
    </React.Fragment>
  );
}

Stats.propTypes = {
  data: PropTypes.shape({
    compData: PropTypes.array,
  }),
};

export default withBox(Stats);
