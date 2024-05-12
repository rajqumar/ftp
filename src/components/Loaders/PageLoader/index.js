import React from 'react';
import PropTypes from 'prop-types';

export function PageLoader(props) {
  const { text } = props;

  return (
    <center className="loaderDiv">
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p
        style={{
          textTransform: 'uppercase',
          fontWeight: 600,
          color: 'rgba(37, 32, 32, 1) !important',
          fontSize: '12px !important',
          marginTop: '10px',
        }}>
        {' '}
        {text}
      </p>
      <style>{`
        .loaderDiv {
          position: absolute;
          left: 50%;
          top: 40%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }
      `}</style>
    </center>
  );
}

PageLoader.propTypes = {
  text: PropTypes.string,
};

export default PageLoader;
