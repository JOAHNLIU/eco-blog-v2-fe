import PropTypes from 'prop-types';

function LikeButton({ isLiked, likes, onToggleLike }) {
  return (
    <button
      className={`like-button ${isLiked ? 'liked' : ''}`}
      onClick={onToggleLike}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="like-icon"
      >
        {isLiked ? (
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        ) : (
          <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zM12 19.65l-.86-.77C6.14 14.6 3.5 11.83 3.5 8.5 3.5 6.5 5 5 7.5 5c1.3 0 2.54.63 3.5 1.64C11.96 5.63 13.2 5 14.5 5c2.5 0 4 1.5 4 3.5 0 3.33-2.64 6.1-7.64 10.38l-.86.77z" />
        )}
      </svg>
      <span className="like-count">{likes}</span>
    </button>
  );
}

LikeButton.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  onToggleLike: PropTypes.func.isRequired,
};

export default LikeButton;