import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

function BackLink(props) {
  var { link, icon, value } = props;

  <FontAwesomeIcon icon={icon} width="16" />
  
  return (
    <React.Fragment>
        <div className="head_quo">
        <Link href={link}>
            <p className="red_name">
                <FontAwesomeIcon icon={icon} width="16" />
                {value}
            </p>
        </Link>
        <style>{`
        .red_name {
            margin: 0px;
            color: #D2232A;
            text-align: left !important;
            cursor: pointer;
        }
        `}</style>
        </div>
    </React.Fragment>
  );
}

BackLink.propTypes = {
};

export default BackLink;
