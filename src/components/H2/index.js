import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export function H2(props) {
  const { data, icon, position, dynamicClass } = props;

  return (
    <React.Fragment>
      <h2>
        {position === 'left' ? <FontAwesomeIcon icon={icon} width="16" className={dynamicClass} /> : ''}

        {data}

        {position === 'right' ? <FontAwesomeIcon icon={icon} width="16" className={dynamicClass} /> : ''}
      </h2>

      <style>{`
                h2 {
                    font-size: 21px;
                    text-transform: capitalize;
                    color: #333;
                    margin-bottom: 20px;
                    letter-spacing: 1px;
                    text-align: left;
                    font-weight: bold;
                }
            `}</style>
    </React.Fragment>
  );
}

H2.propTypes = {
  data: PropTypes.object,
  position: PropTypes.string,
  icon: PropTypes.object,
  dynamicClass: PropTypes.string,
};

export default H2;
