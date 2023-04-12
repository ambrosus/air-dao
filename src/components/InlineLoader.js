import PropTypes from 'prop-types';

const InlineLoader = ({ className = '' }) => (
  <div className={`inline-loader ${className}`}>
    <div />
    <div />
    <div />
    <div />
  </div>
);

InlineLoader.propTypes = {
  className: PropTypes.string,
};

export default InlineLoader;
