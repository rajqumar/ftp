import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'components/Rating';
import withBox from 'components/Box';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export function RatingList(props) {
  const {
    data: { compData, heading },
  } = props;

  return (
    <div className="box">
      <div className="box-header with-border">
        <div className="row">
          <div className="col-md-6">
            <h3 className="box-title">
              <FontAwesomeIcon icon={faThumbsUp} width="20" />
              &nbsp; {heading}
            </h3>
          </div>
          <div className="col-md-6 pull-right">
            <div id="full-stars-example ">
              <div className="rating-group pull-right">
                <Rating rating={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {compData.map((rating, i) => (
        <div className="row" key={i}>
          <div className="col-md-6" style={{ display: '-webkit-inline-box' }}>
            <FontAwesomeIcon
              icon={rating.icon}
              width="16"
              style={{ marginLeft: '11px', marginRight: '-11px', marginTop: '8px' }}
            />
            <h3 className="box-head"> &nbsp; &nbsp; &nbsp;{rating.title}</h3>
          </div>
          <div className="col-md-6 ">
            <div id="full-stars-example ">
              <div className="rating-group pull-right">
                <Rating rating={rating.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
      <style>{`
          h3 {
            margin-top: 5px;
            font-size: 16px;
            font-weight: 600;
          }

          .box-head {
            margin-top: 5px;
            font-size: 16px;
            color: #c4c2c2;
            font-weight: 600;
          }
          .rating_new
          {
              margin-right:10px;
          }
            `}</style>
    </div>
  );
}

RatingList.propTypes = {
  data: PropTypes.object,
};

export default withBox(RatingList);
