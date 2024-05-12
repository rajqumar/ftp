import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function Button(props) {
  var { value, color, shape, position, icon, dynamicClassName } = props;

  var r_icon = icon != null ? position === 'left' ? <FontAwesomeIcon icon={icon} width="16" /> : '' : '';
  var l_icon = icon != null ? position === 'right' ? <FontAwesomeIcon icon={icon} width="16" /> : '' : '';
  var color_class = `btn-block ${color} ${shape} ${dynamicClassName}`;
  
  if(dynamicClassName === 'table-button') {
    color_class += ' table-button'
  } else if(dynamicClassName === 'table-button-sell') {
    color_class += ' table-button-sell'
  } else {
    color_class += ' btn_sign_in'
  }

  return (
    <React.Fragment>
      <button type="submit" className={color_class}>
        {r_icon}
        {value}
        {l_icon}
      </button>

      <style jsx>{`

        .table-button {
          color: #fff;
          border-radius: 25px;
          font-size: 14px;
          padding: 3px 20px; 
          width: 139px;
        }

        .table-button-sell {
          color: #fff;
          border-radius: 25px;
          font-size: 14px;
          padding: 3px 20px; 
          width: 181px;
        }

        .btn_sign_in {
          color: #fff;
          margin-bottom: 20px;
          padding: 10px;
          font-size: 14px;
          font-weight: 400;
          text-transform: uppercase;
        }

        .red {
          background-color: #D31E25;
          border: 1px solid #D31E25;
        }

        .green {
          background-color: #6DC144;
          border: 1px solid #6DC144;
        }

        .yellow {
          background-color: #FFC200;
          border: 1px solid #FFC200;
        }

        .green:hover {
          background-color: #008d4c !important;
        }

        .silver {
          background-color: grey;
          border-color: rgba(210, 35, 42, 1) !important;
        }

        .rect {
          border-radius: 4px !important;
        }

        .oval {
          border-radius: 50px !important;
        }

        .btn-primary {
          color: #fff;
          background-color: #337ab7;
          border-color: #2e6da4;
        }
      `}</style>
    </React.Fragment>
  );
}

Button.propTypes = {
  value: PropTypes.string,
  color: PropTypes.string,
  shape: PropTypes.string,
  position: PropTypes.string,
  icon: PropTypes.object,
  dynamicClassName: PropTypes.string,
};

export default Button;
