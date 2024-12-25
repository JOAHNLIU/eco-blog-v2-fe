import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import useStore from '../store';

function AuthButton() {
  const { user, setUser, clearUser } = useStore();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser = {
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };
      setUser(loggedUser);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      clearUser();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="auth-info">
          <img src={user.photoURL} alt="User avatar" className="user-avatar" />
          <span>{user.displayName}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      ) : (
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      )}
    </div>
  );
}

export default AuthButton;
