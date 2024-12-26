import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "https://eco-blog-edu.org.ua/api/";

const useStore = create((set) => ({
  posts: [],
  postDetails: null,
  comments: {},
  currentPage: 1,
  postsPerPage: 5,
  user: JSON.parse(localStorage.getItem("user")) || null,

  checkToken: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp < now) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        set({ user: null });
        return false;
      }
      return true;
    } catch {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      set({ user: null });
      return false;
    }
  },

  authenticatedRequest: async (config) => {
    const isValid = await useStore.getState().checkToken();
    if (!isValid) throw new Error("Unauthorized: Token expired");

    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    }
    return axios(config);
  },

  fetchPosts: async (query = "", sort = "date", page = 1) => {
    try {
      const limit = 5;
      const response = await useStore.getState().authenticatedRequest({
        url: `${API_BASE_URL}/api/posts`,
        method: "get",
        params: {
          query,
          sort,
          page,
          limit,
        },
      });
      set({
        posts: response.data.posts,
        totalPosts: response.data.total,
        currentPage: page,
      });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  },

  fetchPostDetails: async (postId) => {
    try {
      const response = await useStore.getState().authenticatedRequest({
        url: `${API_BASE_URL}/posts/${postId}`,
        method: "get",
      });
      set({ postDetails: response.data });
    } catch (error) {
      console.error("Failed to fetch post details:", error);
    }
  },

  fetchComments: async (postId) => {
    try {
      const response = await useStore.getState().authenticatedRequest({
        url: `${API_BASE_URL}/posts/${postId}/comments`,
        method: "get",
      });
      set((state) => ({
        comments: { ...state.comments, [postId]: response.data },
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("authToken", user.accessToken);
    set({ user });
  },

  clearUser: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    set({ user: null });
  },

  toggleLikePost: async (postId) => {
    try {
      const response = await useStore.getState().authenticatedRequest({
        url: `${API_BASE_URL}/posts/${postId}/like`,
        method: "post",
      });
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId ? response.data : post,
        ),
        postDetails:
          state.postDetails?.id === postId ? response.data : state.postDetails,
      }));
    } catch (error) {
      console.error("Error toggling like on post:", error);
    }
  },

  toggleLikeComment: async (postId, commentId) => {
    try {
      const response = await useStore.getState().authenticatedRequest({
        url: `${API_BASE_URL}/posts/${postId}/comments/${commentId}/like`,
        method: "post",
      });
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].map((comment) =>
            comment.id === commentId ? response.data : comment,
          ),
        },
      }));
    } catch (error) {
      console.error("Error toggling like on comment:", error);
    }
  },

  addPost: async (newPost) => {
    try {
      const response = await useStore.getState().authenticatedRequest({
        url: `${API_BASE_URL}/posts`,
        method: "post",
        data: newPost,
      });
      set((state) => ({
        posts: [response.data, ...state.posts],
      }));
    } catch (error) {
      console.error("Error adding post:", error);
    }
  },

  addComment: async (postId, newComment) => {
    try {
      const response = await useStore.getState().authenticatedRequest({
        url: `${API_BASE_URL}/posts/${postId}/comments`,
        method: "post",
        data: newComment,
      });
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), response.data],
        },
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useStore;
