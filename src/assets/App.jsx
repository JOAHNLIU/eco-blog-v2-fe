import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';

function App() {
  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My first post',
      text: 'This is the text of my first post.',
      author: 'John',
      date: new Date().toISOString(),
      likes: 10,
      isLiked: false,
      commentsCount: 2,
    },
    {
      id: 2,
      title: 'Second post',
      text: 'More content.',
      author: 'Doe',
      date: new Date(Date.now() - 86400000).toISOString(),
      likes: 20,
      isLiked: false,
      commentsCount: 0,
    },
  ]);

  const [comments, setComments] = useState({
    1: [
      { id: 1, text: 'Great post!', likes: 2, author: 'Alice', isLiked: false },
      { id: 2, text: 'Very helpful!', likes: 5, author: 'Bob', isLiked: false },
    ],
    2: [],
  });

  const handleToggleLikePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleToggleLikeComment = (postId, commentId) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: prevComments[postId].map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            }
          : comment
      ),
    }));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              setUser={setUser}
              posts={posts}
              setPosts={setPosts}
              onToggleLikePost={handleToggleLikePost}
            />
          }
        />
        <Route
          path="/post/:postId"
          element={
            <PostPage
              user={user}
              setUser={setUser}
              posts={posts}
              comments={comments}
              setComments={setComments}
              onToggleLikePost={handleToggleLikePost}
              onToggleLikeComment={handleToggleLikeComment}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
