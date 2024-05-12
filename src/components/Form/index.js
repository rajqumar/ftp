import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

const newField = ({ input, placeholder, type, id, meta: { touched, error, warning } }) => (
  <div>
    <input {...input} placeholder={placeholder} type={type} id={id} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

const Form = props => {
  const { formElements, handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formElements.map((el, i) => (
          <React.Fragment key={i}>
            <div className="form-group">
              <label htmlFor={el.label}>{el.label}</label>

              <Field
                component={newField}
                type={el.type}
                name={el.name}
                id={el.id}
                className="form-control"
                placeholder={el.placeholder}
                validate={el.validation.map(elv => (elv = eval(elv)))}
              />
            </div>
          </React.Fragment>
        ))}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <style>{`
			label {
				font-size: 16px;
			}

			input {
				display: block;
				width: 100%;
				height: 34px;
				padding: 6px 12px;
				font-size: 14px;
				line-height: 1.42857143;
				color: #555;
				margin-bottom: 20px;
				background-color: #fff;
				background-image: none;
				border: 1px solid #ccc;
				border-radius: 4px;
				transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
			}
		`}</style>
    </div>
  );
};

newField.propTypes = {
  input: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.number,
  meta: PropTypes.shape({
    touched: PropTypes.any,
    error: PropTypes.any,
    warning: PropTypes.any,
  }),
};

Form.propTypes = {
  formElements: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default reduxForm({ form: 'ftp_form' })(Form);
