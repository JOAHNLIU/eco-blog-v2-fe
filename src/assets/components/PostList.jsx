import LikeButton from './LikeButton';

function PostList({ posts, onLike, onPostClick }) {
  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="post"
          onClick={() => onPostClick(post.id)}
        >
          <h3>{post.title}</h3>
          <p>{post.text}</p>
          <div className="meta">
            <span>By {post.author}</span> |{' '}
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <div className="actions">
            <LikeButton
              isLiked={post.isLiked}
              likes={post.likes}
              onToggleLike={(e) => {
                e.stopPropagation();
                onLike(post.id);
              }}
            />
            <div className="comment-indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className="comment-icon"
              >
                <path
                  d="M21 6c0-1.65-1.35-3-3-3H6C4.35 3 3 4.35 3 6v6c0 1.65 1.35 3 3 3h2v4l4-4h6c1.65 0 3-1.35 3-3V6zm-3 8H9.17L7 16V14H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v6c0 .55-.45 1-1 1z"
                />
              </svg>
              <span className="comment-count">{post.commentsCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
