import React from 'react';
import PropTypes from 'prop-types';

export function StaticInput(props) {
  const { label, placeholder, md } = props;
  return (
    <div className={`col-md-${md} cont`}>
    <p className="label">{label}</p>
    <div className="input-cont">
      <p className="input">
        {placeholder}
      </p>
    </div>
  <style>{`
    .cont {
        margin-bottom: 1.3rem;
    }

    .label {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: .5rem;
    }

    .input {
        font-size: 14px;
        line-height: 1.42857143;
        padding: .375rem .75rem;
        color: #555;
        margin-bottom: 20px;
    }

    .input-cont {
        border: 1px solid #ccc;
        height: 34px;
    }
  `}</style>
  </div>
  );
}

StaticInput.propTypes = {
};

export default StaticInput;
