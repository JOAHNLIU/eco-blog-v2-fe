import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AddPostModal from '../components/AddPostModal';
import PostList from '../components/PostList';
import SearchBar from '../components/SearchBar';
import SortDropdown from '../components/SortDropdown';
import Pagination from '../components/Pagination';
import LoginModal from '../components/LoginModal';
import useStore from '../store.js';

function Home() {
  const {
    user,
    setUser,
    posts,
    fetchPosts,
    toggleLikePost,
    addPost,
    currentPage,
    setCurrentPage,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('date');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddPostModal, setShowAddPostModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page'), 10) || 1;
    const sort = params.get('sort') || 'date';
    const query = params.get('query') || '';
    setCurrentPage(page);
    setSortType(sort);
    setSearchQuery(query);
    fetchPosts(query, sort, page);
  }, [location.search, fetchPosts, setCurrentPage]);

  const handleActionWithAuthCheck = (callback) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    callback();
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handlePageChange = (direction) => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    if (newPage > 0) {
      navigate(`/?page=${newPage}&sort=${sortType}&query=${searchQuery}`);
    }
  };

  const handleAddPost = (newPost) => {
    addPost({
      ...newPost,
      author: user?.displayName || 'Anonymous',
    });
    setShowAddPostModal(false);
  };

  return (
    <div>
      <Navbar
        user={user}
        onLogin={() => setUser({ displayName: 'John', photoURL: 'https://via.placeholder.com/30'})}
        onLogout={() => setUser(null)}
      />
      <div className="container">
        <SearchBar
          value={searchQuery}
          onChange={(query) =>
            navigate(`/?page=1&sort=${sortType}&query=${query}`)
          }
        />
        <SortDropdown
          onSortChange={(sort) =>
            navigate(`/?page=1&sort=${sort}&query=${searchQuery}`)
          }
          currentSort={sortType}
        />
        <button
          onClick={() =>
            handleActionWithAuthCheck(() => setShowAddPostModal(true))
          }
          className="add-post-button"
        >
          Add new post
        </button>
        <PostList
          posts={posts || []}
          onPostClick={handlePostClick}
          onLike={(postId) => handleActionWithAuthCheck(() => toggleLikePost(postId))}
        />
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          hasNextPage={posts.length >= 5} // Використовуємо фіксовану кількість постів на сторінку
        />
      </div>
      {showLoginModal && (
        <LoginModal
          message="Please log in to perform this action."
          onClose={() => setShowLoginModal(false)}
        />
      )}
      {showAddPostModal && (
        <AddPostModal
          onClose={() => setShowAddPostModal(false)}
          onSubmit={handleAddPost}
        />
      )}
    </div>
  );
}

export default Home;