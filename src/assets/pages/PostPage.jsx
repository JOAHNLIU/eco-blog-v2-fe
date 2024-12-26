import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoginModal from '../components/LoginModal';
import LikeButton from '../components/LikeButton';
import useStore from '../store.js';

function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const {
    postDetails,
    fetchPostDetails,
    user,
    setUser,
    toggleLikePost,
    comments,
    fetchComments,
    addComment,
    toggleLikeComment,
  } = useStore();

  const [newComment, setNewComment] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchPostDetails(postId);
      await fetchComments(postId);
      setLoading(false);
    };

    loadData();
  }, [fetchPostDetails, fetchComments, postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!postDetails) {
    return (
      <div>
        <Navbar
          user={user}
          onLogin={() => setUser({ displayName: 'John', photoURL: 'https://via.placeholder.com/30' })}
          onLogout={() => setUser(null)}
        />
        <div className="container">
          <button className="back-button" onClick={() => navigate('/')}>
            Back
          </button>
          <h1>Post not found</h1>
        </div>
      </div>
    );
  }

  const postComments = comments[postId] || [];

  const handleAddComment = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        likes: 0,
        author: user.displayName,
        isLiked: false,
      };

      addComment(postId, newCommentObj);
      setNewComment('');
    }
  };

  const handleActionWithAuthCheck = (callback) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    callback();
  };

  return (
    <div>
      <Navbar
        user={user}
        onLogin={() => setUser({ displayName: 'John', photoURL: 'https://via.placeholder.com/30' })}
        onLogout={() => setUser(null)}
      />
      <div className="container">
        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
        <div>
          <h1>{postDetails.title}</h1>
          <p>{postDetails.text}</p>
          <div className="meta">
            <span>By {postDetails.author}</span> | <span>{new Date(postDetails.date).toLocaleDateString()}</span>
          </div>
          <div className="actions">
            <LikeButton
              isLiked={postDetails.isLiked}
              likes={postDetails.likes}
              onToggleLike={() => handleActionWithAuthCheck(() => toggleLikePost(postDetails.id))}
            />
          </div>
        </div>
        <div className="comments-section">
          <h2>Comments</h2>
          {postComments.length > 0 ? (
            <ul className="comments-list">
              {postComments.map((comment) => (
                <li key={comment.id} className="comment">
                  <p>{comment.text}</p>
                  <div className="comment-meta">
                    <span>By {comment.author}</span>
                    <LikeButton
                      isLiked={comment.isLiked}
                      likes={comment.likes}
                      onToggleLike={() =>
                        handleActionWithAuthCheck(() => toggleLikeComment(postId, comment.id))
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
          <div className="add-comment-section">
            <input
              type="text"
              className="comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button className="add-comment-button" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
        </div>
      </div>
      {showLoginModal && (
        <LoginModal
          message="Please log in to perform this action."
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}

export default PostPage;
