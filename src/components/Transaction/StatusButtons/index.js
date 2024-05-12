import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

export function StatusButtons(props) {
    const { greenCond, yellowCond, status, dynamicClass } = props;

    var green = greenCond.some(el => status.includes(el));
    var yellow = yellowCond.some(el => status.includes(el));
    var color = green ? 'green' : yellow ? 'yellow' : 'red';

    return <Button color={color} dynamicClassName={dynamicClass ? dynamicClass : "table-button"} shape="oval" value={status} />;
}

StatusButtons.propTypes = {
    greenCond: PropTypes.array,
    yellowCond: PropTypes.array,
    status: PropTypes.string
};

export default StatusButtons;
