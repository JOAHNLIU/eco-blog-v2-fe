function LoginModal({ message, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose} className="modal-close">×</button>
      </div>
    </div>
  );
}

export default LoginModal;