import React, { Component } from 'react';
import H5 from 'components/H5';
import Rating from 'components/Rating';
import PropTypes from 'prop-types';
import BoxLayout from './Layout';

const withBox = WrappedComponent => {
  class HOC extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      const {
        data: { heading, rating, icon, dropdown, rightButton, compData },
      } = this.props;

      return (
        <BoxLayout data={this.props.data} WrappedComponent={WrappedComponent} />
      );
    }
  }

  HOC.propTypes = {
    data: PropTypes.shape({
      heading: PropTypes.string,
      rating: PropTypes.array,
      icon: PropTypes.object,
    }),
  };

  return HOC;
};

export default withBox;
