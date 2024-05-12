import React from 'react';
import { Field, reduxForm } from 'redux-form';
import AutoSuggest from 'react-autosuggest';
import Router from 'next/router';

class InputSuggestions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filteredSuggestions: [],
    };
  }

  handleFetch = ({ value }) => {
    const { suggestions } = this.props;
    const filteredSuggestions = suggestions.filter(({ label }) => label.toLowerCase().startsWith(value));
    this.setState({ filteredSuggestions });
  };

handleClear = () => {
    this.setState({ filteredSuggestions: [] });
  };

  handleGetSuggestion = props => {
    this.props.onSupplierChange({ value: props.value, label: props.label, desc: props.description });
    return props.label;
  };

  handleSuggestionHighlighted = ({ suggestion }) => {
    this.setState({ highlightedSuggestion: suggestion });
  };

  renderSuggestion = props => {
    return (
      <React.Fragment>
        <span>{props.label}</span>
        <style>{`
.react-autosuggest__container {
  position: relative;
}

.react-autosuggest__suggestions-container--open {
  display: block;
  position: absolute;
  top: 34px;
  width: 339px;
  border: 1px solid #aaa;
  background-color: #fff;
  font-color: #555;
  font-size: 13px;
  z-index: 2;
}

.react-autosuggest__suggestions-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.react-autosuggest__suggestion {
  cursor: pointer;
  padding: 10px 20px;
}
  
  `}</style>
      </React.Fragment>
    );
  };

  handleSuggestionSelected = (event, { suggestionValue, method }) => {
    const { input } = this.props;
    input.onChange(suggestionValue);
    if (method === 'enter') {
      event.preventDefault();
    }
  };

  render() {
    const { input, suggestions } = this.props;
    const supplier = suggestions.filter(suggestion => suggestion.value == Router.query.supp_id);
    if (supplier.length == 1) {
      input.value = supplier[0].label;
    }
    const { filteredSuggestions } = this.state;

    return (
      <AutoSuggest
        suggestions={filteredSuggestions}
        onSuggestionsFetchRequested={this.handleFetch}
        onSuggestionsClearRequested={this.handleClear}
        getSuggestionValue={this.handleGetSuggestion}
        renderSuggestion={this.renderSuggestion}
        onSuggestionHighlighted={this.handleSuggestionHighlighted}
        onSuggestionSelected={this.handleSuggestionSelected}
        inputProps={input}
      />
    );
  }
}

const SearchInput = props => {
  const { suggestions, label, name, onSupplierChange } = props;

  return (
    <div>
      {label ? <label>{label}</label> : null}
      <Field name={name} component={InputSuggestions} suggestions={suggestions} onSupplierChange={onSupplierChange} />
    </div>
  );
};

export default SearchInput;
