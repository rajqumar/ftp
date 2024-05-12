import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const required = value => (value ? undefined : 'Required');
const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength8 = maxLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{7,9})$/i.test(value) ? 'Invalid phone number, must be 8-10 digits' : undefined;

const rangeValidator = (value, previousValue, allValues) => {
  if(value && /\d+-\d+/.test(value)) {
  var c1 = value.split('-')
  var allElm = []
  Object.values(previousValue).map(p => {
    if(p && p.includes('-')) {
      p.split('-').map(pi => allElm = [...allElm, pi])
    }
  })

  if(allElm.length > 2) {
    allElm.length = allElm.length - 2
    console.log('allElm[allElm.length-1]', allElm[allElm.length-1])
    console.log('allElm[allElm.length-2]', allElm[allElm.length-2])
    var v1 = allElm[allElm.length-1]
    var v2 = allElm[allElm.length-2]
    console.log('c1', c1)
    var re = true
    if(v1 && v2 && c1[0] && c1[1]) {
      re = c1[0] > v1 && c1[0] > v2 && c1[1] > v1 && c1[1] > v2 && c1[0] < c1[1]
    }
    return !re ? 'Invalid Qty' : undefined
  } else {
    return undefined
  }
  } else {
    return undefined
  }
}

const rangeFormat = value => /\d+-\d+/.test(value) ? undefined : 'Invalid format';

const newField = ({
  input,
  type,
  placeholder,
  id,
  disabled,
  validationPosition,
  tabIndex,
  className,
  meta: { touched, error },
}) => {
  return (
    <div>
      <input
        {...input}
        placeholder={placeholder}
        type={type}
        id={id}
        disabled={disabled}
        autoComplete="off"
        tabIndex={tabIndex}
        className={className}
      />
      {touched && error && (
        <p className="req_para" style={{ color: 'red', marginLeft: validationPosition }}>
          {error}
        </p>
      )}
      <style>{`
      .mgl15 {
        margin-left: 39px !important;
      }
      `}</style>
    </div>
  );
};

const renderSelect = ({ input, meta: {touched, error}, children }) => (
  <div className="field">
    <div className="control">
      <div className={'select ' + (touched ? (error ? 'is-danger' : 'is-success') : '')}>
        <select {...input} className="form-control dropdown-size">
          {children}
        </select>
        {touched && (error && <p style={{ color: 'red' }}>{error}</p>)}
      </div>
    </div>
  </div>
);

const handlePreview = image => {
  const previewImageDom = document.querySelector('.invoice_name');
  previewImageDom.innerHTML = '<img style="margin-right: 10px" src="/static/images/pdf.png" width="20" height="20" /> '
  previewImageDom.innerHTML += image.name
};

const handleChange = (event, input) => {
  event.preventDefault();
  let imageFile = event.target.files[0];
  if (imageFile) {
      input.onChange(imageFile);
    handlePreview(imageFile);
  }
};

const renderFileInput = ({ input, type, meta }) => {
  const mimeType = 'image/*,.pdf,.doc';
  return (
  <div class="file-upload">
    <label for="upload" class="file-upload__label">Upload</label>
    <input name={input} type={type} id="upload" class="file-upload__input" accept={mimeType} onChange={event => handleChange(event, input)} required />
    {meta && meta.invalid && meta.error && <p>{meta.error}</p>}

  <style>{`
  .file-upload {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  
  .file-upload__label {
    display: block;
    padding: 0.5em 2em;
    color: #fff;
    background: rgba(210,35,42,1);
    border-radius: .4em;
    transition: background .3s;
  }
      
  .file-upload__label:hover {
    cursor: pointer;
    background: rgb(217, 87, 92);
 }
  .file-upload__input {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      font-size: 1;
      width:0;
      height: 100%;
      opacity: 0;
  }
  `}</style>
</div>
  );
};

const renderTextArea = ({ input, meta: { touched, error, warning } }) => (
    <div>
      <textarea {...input} placeholder="" rows="7" cols="90" />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

const renderTxTextArea = ({ input, meta: { touched, error, warning } }) => (
  <div>
    <textarea {...input} placeholder="" rows="4" cols="56" />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

const getInputComponent = data => {

  switch (data.type) {
    case 'file':
      return (
        <React.Fragment>
          <div className={`form-group ${data.position}`}>
            {data.label ? (
              <label htmlFor={data.label} className={data.dynamicClass || ''}>
                {data.label}
              </label>
            ) : (
              ''
            )}
            <center>
            <p className="invoice_name">
            </p>
            </center>
            <Field
              component={renderFileInput}
              type={data.type}
              name={data.name}
              id={data.id}
              className="form-control"
            />
          </div>
          <style>{`
            label {
              font-size: 16px;
            }
            .invoice_name {
              margin: 10px;
              border-radius: 23px;
              font-size: 15px;
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

            .checkbox-inline, .radio-inline {
              position: relative;
              display: inline-block;
              padding-left: 20px;
              margin-bottom: 0;
              font-weight: 400;
              vertical-align: middle;
              cursor: pointer;
            }
        .req_para
        {
          margin-top:-20px;
          text-align:left;
        }
        .dropdown-size
        {
          height:34px;
        }
            .checkbox-inline, .radio-inline {
              position: relative;
              display: inline-block;
              padding-left: 20px;
              margin-bottom: 0;
              font-weight: 400;
              vertical-align: middle;
              cursor: pointer;
            }

            .inline_check_issue {
              height:auto !Important;
              width:auto !important;
            }

            .inline_radio_issue {
              height:auto !Important;
              width:auto !important;
              position: absolute;
              margin-top: 4px;
              margin-left: -20px !important;
            }

            input[type=checkbox],
            input[type=radio]{
              height: 15px !important;
              display: inline-block;
            }
        `}</style>
        </React.Fragment>
      );

    case 'textarea':
      return (
        <div className={`form-group ${data.position}`}>
          {data.label ? (
            <label htmlFor={data.label} className={data.dynamicClass || ''}>
              {data.label}
            </label>
          ) : null}
          <Field
            name={data.name}
            component={data && data.box && data.box === 'tx' ? renderTxTextArea : renderTextArea}
            className="form-control dropdown-size"
            onChange={data.onChange}
            style={{ width: '100%' }}></Field>
        </div>
      );

    case 'dropdown':
      return (
        <div className={`form-group ${data.position}`}>
          {data.label && data.label.length > 0 ? (
            <label htmlFor={data.label} className={data.dynamicClass || ''}>
              {data.label}
            </label>
          ) : null}
          <Field
            name={data.name}
            component={renderSelect}
            className="form-control dropdown-size"
            onChange={data.onChange}
            tabIndex={data.tabIndex}
            validate={data.validate && data.validate.length > 0 ? data.validate.map(elv => (elv = eval(elv))) : ""}
            style={{ width: '100%' }}>
          <option>{data.defaultOption != undefined ? data.defaultOption : (data.label.includes('Select') ? data.label : 'Select ' + data.label)}</option>
            {data.dropdownData.map((e, key) => {
              return (
                <option key={key} value={e.value}>
                  {e.name}
                </option>
              );
            })}
          </Field>
          <style>{`
  .dropdown-size {
    font-size: 14px !important;
  }
  `}</style>
        </div>
      );

    default:
      return (
        <React.Fragment>
          <div className={`form-group ${data.position}`}>
            {data.label ? (
              <label htmlFor={data.label} className={data.dynamicClass || ''}>
                {data.label}{data.validate!= undefined && data.validate.length > 0 ? data.validate.map((value) => {
                  return value == 'required' ? <span className="asterix"> *</span> : '' 
                }): ''}
              </label>
            ) : (
              ''
            )}
            <Field
              component={newField}
              type={data.type}
              name={data.name}
              id={data.id}
              className={`form-control ${data.inputClass}`}
              placeholder={data.placeholder}
              value={data.value}
              onChange={data.onChange}
              checked={data.checked}
              disabled={data.isDisabled}
              validationPosition={data.validationPosition}
              tabIndex={data.tabIndex}
              validate={data.validate && data.validate.length > 0 ? data.validate.map(elv => (elv = eval(elv))) : ''}
            />
          </div>
          <style>{`
              label {
                font-size: 16px;
              }
              .fullw {
                width: 90% !important;
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

              .checkbox-inline, .radio-inline {
                position: relative;
                display: inline-block;
                padding-left: 20px;
                margin-bottom: 0;
                font-weight: 400;
                vertical-align: middle;
                cursor: pointer;
              }
          .req_para
          {
            margin-top:-20px;
            text-align:left;
          }
          .dropdown-size
          {
            height:34px;
          }
              .checkbox-inline, .radio-inline {
                position: relative;
                display: inline-block;
                padding-left: 20px;
                margin-bottom: 0;
                font-weight: 400;
                vertical-align: middle;
                cursor: pointer;
              }

              .inline_check_issue {
                height:auto !Important;
                width:auto !important;
              }

              .inline_radio_issue {
                height:auto !Important;
                width:auto !important;
                position: absolute;
                margin-top: 4px;
                margin-left: -20px !important;
              }

              .asterix {
                color: red;
              }
              input[type=checkbox],
              input[type=radio]{
                height: 15px !important;
                display: inline-block;
              }
          `}</style>
        </React.Fragment>
      );
  }
};

const Plain = props => {
  const { data } = props;

  return <React.Fragment>{getInputComponent(data)}</React.Fragment>;
};

newField.propTypes = {
  input: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.string,
  id: PropTypes.number,
  validationPosition: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.any,
    error: PropTypes.any,
    warning: PropTypes.any,
  }),
};

renderTextArea.propTypes = {
  input: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.any,
    error: PropTypes.any,
    warning: PropTypes.any,
  }),
};

renderTxTextArea.propTypes = {
  input: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.any,
    error: PropTypes.any,
    warning: PropTypes.any,
  }),
};


renderSelect.propTypes = {
  input: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.any,
    error: PropTypes.any,
  }),
  children: PropTypes.any,
};

renderFileInput.propTypes = {
  input: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    invalid: PropTypes.any,
    error: PropTypes.any,
  }),
}

Plain.propTypes = {
  data: PropTypes.object,
};

export default Plain;
