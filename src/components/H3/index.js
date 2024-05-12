import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

export function H3(props) {
  const { data, icon, position } = props;

  return (
    <React.Fragment>
      <h3>
        {position === 'left' ? <FontAwesomeIcon icon={icon} width="16" /> : ''}

        {data}

        {position === 'right' ? <FontAwesomeIcon icon={icon} width="16" /> : ''}
      </h3>

      <style>{`
                h3 {
                    color: #333;
                    word-break: break-word;
                    display: inline-block;
                    font-size: 20px;
                    margin: 0;
                    line-height: 1;
                    font-weight: 700;
                }
            `}</style>
    </React.Fragment>
  );
}

H3.propTypes = {
  data: PropTypes.object,
  position: PropTypes.string,
  icon: PropTypes.object,
};

export default H3;
