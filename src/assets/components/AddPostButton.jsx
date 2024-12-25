function AddPostButton({ onClick }) {
  return (
    <button onClick={onClick} className="add-post-button">
      Add new post
    </button>
  );
}

export default AddPostButton;