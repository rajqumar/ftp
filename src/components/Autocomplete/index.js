import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getProductData } from 'containers/SearchParts/actions';

export function Autocomplete(props) {
  const { placeholder, name, dynamicClass, options, SearchedKeyword, type } = props;

  const [activeOption, setActiveOption] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [userInput, setUserInput] = useState(SearchedKeyword || '');
  const router = useRouter();
  const dispatch = useDispatch();

  const onChange = e => {
    const userInput = e.currentTarget.value;
    const filteredOptions =
      options != undefined
        ? options.filter(optionName => optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1)
        : '';

    setActiveOption(0);
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
    setUserInput(e.currentTarget.value);
  };

  const onClick = e => {
    if (type === 'createRFQ') {
      setUserInput(e.currentTarget.innerText);
      setShowOptions(false);
    } else {
      router.push(`/search?searchvalue=${e.currentTarget.innerText}&search=`);
      dispatch(getProductData(e.currentTarget.innerText));
      setActiveOption(0);
      setFilteredOptions([]);
      setShowOptions(false);
      setUserInput(e.currentTarget.innerText);
    }
  };

  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className="options">
          {filteredOptions.map((optionName, index) => {
            let className;
            if (index === activeOption) {
              className = 'option-active';
            }
            return (
              <li className={className} key={optionName} onClick={onClick}>
                {optionName}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <div className="no-options">
          <em>No search result found!</em>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <input
        type="text"
        className={`search-box ${dynamicClass}`}
        onChange={onChange}
        value={userInput}
        placeholder={placeholder}
        name={name}
        autoComplete="off"
      />
      <div className="search_result_drop">{optionList}</div>

      <style>{`
        #search-btn {
          background: #fff !important;
          border: 0px !important;
          border-radius: 5px;
          margin-right: 20px;
          padding: 7px;
          border-left: none !important;
        }

        .search-btn:hover {
          outline: none;
          opacity: 0.4;
          cursor: pointer;
        }
        .search-form-control
        {
          border-radius: 5px !important;
    height: 45px;
    border: none;
    margin-bottom: 5px !important;
        }

        .search-btn:focus {
          outline: none;
          opacity: 0.6;
        }
        
        ul.options {
          display: block;
          list-style: none;
          transition: width 0.3s;
          margin: auto;
          margin-left: -40px;
          position: relative;
        }
        
        ul.options li {
          display: block;
          background: white;
          padding: 10px;
          font-size: 14px;
          width: 100%;
          border-radius: 2px;
          border-bottom:1px solid #eee;
        }

        ul.options li:hover {
          font-weight: bold;
          color: #333;
          background: #e9e6e6;
          cursor: pointer;
          transition: 0.3s all;
        }
        
        ul.options li.option-active {
          background: #e9e6e6;
          font-size: 14px;
          color: #333;
        }

        .no-options {
          color: white;
          padding-top: 0px;
          top: 0px;
          position: absolute;
           }    

        .search_result_drop {
          position: absolute;
          border-bottom: none;
          border-top: none;
          z-index: 99;
          top: 90%;
          left: 0;
          right: 0;
        }    
      `}</style>
    </React.Fragment>
  );
}

Autocomplete.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  dynamicClass: PropTypes.string,
  options: PropTypes.array,
  SearchedKeyword: PropTypes.string,
  type: PropTypes.string,
};

export default Autocomplete;
