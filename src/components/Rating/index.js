import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Rating extends Component {
  constructor(props) {
    super(props);
    const { rating, className } = this.props;
    this.state = {
      currentRating: rating,
      numberOfStars: 5,
    };
    this.ratingRef = React.createRef();
  }
  componentDidMount() {
    this.setRating();
  }
  hoverHandler = ev => {
    const stars = ev.target.parentElement.getElementsByClassName('star');
    const hoverValue = ev.target.dataset.value;
    Array.from(stars).forEach(star => {
      star.style.color = hoverValue >= star.dataset.value ? 'orange' : '#ddd';
    });
  };
  setRating = () => {
    const { currentRating } = this.state;
    const stars = this.ratingRef.getElementsByClassName('star');
    Array.from(stars).forEach(star => {
      star.style.color = currentRating >= star.dataset.value ? 'orange' : '#ddd';
    });
  };
  starClickHandler = ev => {
    const { onClick } = this.props;
    let rating = ev.target.dataset.value;
    this.setState({ currentRating: rating });
    if (onClick) {
      onClick(rating);
    }
  };
  render() {
    const { currentRating, numberOfStars } = this.state;
    const { className } = this.props
    return (
      <div
        className={`${className} rating rating_new`}
        ref={el => (this.ratingRef = el)}
        data-rating={currentRating}
        onMouseOut={this.setRating}>
        {[...Array(+numberOfStars).keys()].map(n => {
          return (
            <span
              className="star"
              key={n + 1}
              data-value={n + 1}
              onMouseOver={this.hoverHandler}
              onClick={this.starClickHandler}>
              &#9733;
            </span>
          );
        })}
        <style>{`	
          .star {	
            color: orange;	
            font-size: 25px;	
          }	
          .mtm-5 {
            margin-top: -5px !important;
          }
          span {	
            cursor: pointer; 	
          }	
        `}</style>
      </div>
    );
  }
}
Rating.propTypes = {
  rating: PropTypes.array,
  onClick: PropTypes.func,
};
export default Rating;
