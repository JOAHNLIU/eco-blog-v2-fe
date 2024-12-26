import { useState } from 'react';

function AddPostModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (title.trim() && text.trim()) {
      onSubmit({
        id: Date.now(),
        title,
        text,
        date: new Date().toISOString(),
        likes: 0,
        commentsCount: 0,
        isLiked: false,
      });
      setTitle('');
      setText('');
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Add New Post</h2>
        <input
          type="text"
          className="modal-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="modal-textarea"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="modal-submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddPostModal;
