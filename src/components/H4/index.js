import React from 'react';
import PropTypes from 'prop-types';

export function H4(props) {
  const { data } = props;

  return (
    <React.Fragment>
      <h4>{data}</h4>
      <style>{`
                h4 {
                    padding-left: 15px;
                    font-size: 20px;
                    font-weight: 700;
                }
            `}</style>
    </React.Fragment>
  );
}

H4.propTypes = {
  data: PropTypes.object,
};

export default H4;
