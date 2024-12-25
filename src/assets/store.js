import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  posts: [],
  comments: {},
  currentPage: 1,
  postsPerPage: 5,
  fetchPosts: async () => {
    const mockPosts = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: `Post #${index + 1}`,
      text: `This is the text of post #${index + 1}.`,
      author: index % 2 === 0 ? "John" : "Doe",
      date: new Date(Date.now() - index * 86400000).toISOString(),
      likes: Math.floor(Math.random() * 100),
      isLiked: false,
      commentsCount: Math.floor(Math.random() * 10),
    }));
    set({ posts: mockPosts });
  },
  fetchComments: async (postId) => {
    const mockComments = Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      text: `Comment #${index + 1} on post ${postId}`,
      likes: Math.floor(Math.random() * 10),
      author: index % 2 === 0 ? "Alice" : "Bob",
      isLiked: false,
    }));
    set((state) => ({
      comments: { ...state.comments, [postId]: mockComments },
    }));
  },
  setUser: (user) => set({ user }),
  toggleLikePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    }));
  },
  toggleLikeComment: (postId, commentId) => {
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: state.comments[postId].map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
                isLiked: !comment.isLiked,
              }
            : comment,
        ),
      },
    }));
  },
  addPost: (newPost) => {
    set((state) => ({
      posts: [newPost, ...state.posts],
    }));
  },
  addComment: (postId, newComment) => {
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [...(state.comments[postId] || []), newComment],
      },
    }));
  },
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useStore;
