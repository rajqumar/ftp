import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

function Toggle(props) {
  const { currentUserRole } = props;
  const dispatch = useDispatch();

  const [isChecked, updateChecked] = useState(false);

  const handleChange = () => {
    var role = isChecked ? 'buyer' : 'seller';
    window.localStorage.setItem('role', role);
    dispatch(currentUserRole(role));
    updateChecked(!isChecked);
  };

  return (
    <React.Fragment>
      <div className="main-toogle">
        <span className={`text buy ${isChecked ? 'highlight' : ''}`}>Buy</span>

        <label className="switch">
          <input type="checkbox" value={isChecked} onChange={handleChange} />
          <div className="slider"></div>
        </label>

        <span className={`text sell ${!isChecked ? 'highlight' : ''}`}>Sell</span>
      </div>
      <style>{`
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
      outline: none !important;
    }
    .main-toogle{
       margin-top: 9px;
    }
    .switch input {
      position: absolute;
      top: -99999px;
      left: -99999px;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #FFFFD7;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 34px;
    }
    .sellactive {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #FFFFD7;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 34px;
    }
    .sellactive:before{
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      right: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 50%;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background-color: #D3EFFF;;
    }
    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    .highlight{
      color:grey;
    
    }
    .buy{
      margin-left: -35px;
    }
    .sell{
      margin-left: 12px;
    }
    .text {
      text-transform: uppercase;
      font-weight: 600;
      color: rgba(37, 32, 32, 1) !important;
      font-size: 14px !important;
      position: absolute;
      padding-right: 20px;
      margin-top: 7px;
    }
    `}</style>
    </React.Fragment>
  );
}
Toggle.propTypes = {
  currentUserRole: PropTypes.object,
};

export default Toggle;
