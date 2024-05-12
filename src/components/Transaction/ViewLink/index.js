import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export function ViewLink(props) {
  const { step, type, no, id } = props;
  return (
    <Link href={`/${step}/${type}/view/${no}/${id}`} style={{ cursor: 'pointer !important' }}>
      <span style={{ color: '#D2232A !important' }}>{no}</span>
    </Link>
  );
}

ViewLink.propTypes = {
    no: PropTypes.string,
    id: PropTypes.string
};

export default ViewLink;
