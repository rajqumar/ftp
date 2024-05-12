import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export function H6(props) {
  const { data, icon, position } = props;

  return (
    <React.Fragment>
      <h6>
        {position === 'left' ? <FontAwesomeIcon icon={icon} width="16" /> : ''}

        {data}

        {position === 'right' ? <FontAwesomeIcon icon={icon} width="16" /> : ''}
      </h6>

      <style>{`
                h6 {
                    font-weight: 700;
                    font-size: 14px;
                    text-align: left;
                }
            `}</style>
    </React.Fragment>
  );
}

H6.propTypes = {
  data: PropTypes.object,
  position: PropTypes.string,
  icon: PropTypes.object,
};

export default H6;
