import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export function H5(props) {
  const { data, icon, position, className } = props;

  return (
    <React.Fragment>
      <h5 className={className}>
        {position === 'left' ? <FontAwesomeIcon icon={icon} width="16" /> : ''}

        {` ${data}`}

        {position === 'right' ? <FontAwesomeIcon icon={icon} width="16" /> : ''}
      </h5>

      <style>{`
                .mb-0 {
                  margin-bottom: 0px !important;
                }
                h5 {
                    text-align: left !important;
                    font-size: 16px;
                    font-weight: 700;
                }
            `}</style>
    </React.Fragment>
  );
}

H5.propTypes = {
  data: PropTypes.object,
  position: PropTypes.string,
  icon: PropTypes.object,
};

export default H5;
