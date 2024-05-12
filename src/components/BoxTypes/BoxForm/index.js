import React from 'react';
import Form from 'components/Form';
import withBox from 'components/Box';
import PropTypes from 'prop-types';

export function BoxForm(props) {
  var { data } = props;

  const loginRequest = () => {
    console.log('BOX FORM Submitted !!');
  };

  return (
    <div className="col-md-4">
      <Form formElements={data} onSubmit={loginRequest} />
    </div>
  );
}

BoxForm.propTypes = {
  data: PropTypes.object,
};

export default withBox(BoxForm);
