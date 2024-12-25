function Navbar({ user, onLogin, onLogout }) {
  return (
    <div className="navbar">
      <h1 className="navbar-title">Eco Blog</h1>
      <div className="navbar-actions">
        {user ? (
          <div className="user-info">
            <img src={user.photoURL} alt="User Avatar" className="user-avatar" />
            <span className="user-name">{user.displayName}</span>
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={onLogin}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;