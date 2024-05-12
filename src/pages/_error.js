import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error: error, errorInfo: errorInfo });
  }

  render() {
    return (
      <div>
        {this.state.errorInfo && this.state.hasError ? (
          <div className="snap">
            <img src="/static/images/no_image.png" />
            <h1>Oops!!! Something went wrong...</h1>
          </div>
        ) : (
          this.props.children
        )}
        <style>{`
      .snap {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      `}</style>
      </div>
    );
  }
}

export default ErrorBoundary;
