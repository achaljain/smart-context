/** This is deep nested store using immer plug */
import produce from "immer";

const getData = () => {
  return new Promise((resolve) => {
    const postData = ["Post 1", "Post 2"];
    setTimeout(() => {
      resolve(postData);
    }, 2000);
  });
};

const updateWithImmer = (cb) => (state) => {
  const newSt = produce(state, cb);
  return newSt;
};

const initialState = { loading: false, post: [] };

const actionsConfig = {
  /**
   * Simple actions with keys list to update
   */
  setLoading: ["loading"],
  /**
   * Custom handler for async API calls
   * State update using spread operator
   * @returns {function} State transformation function
   */
  setPost: async () => {
    // Simulate Async
    const data = await getData();
    return (state) => {
      return { ...state, post: data, loading: false };
    };
  },
  /**
   * Custom handler with immer integration
   * State updates using immer for deep objects for immutability
   * @returns {function} State transformation function
   */
  addPost: () =>
    updateWithImmer((state) => {
      state.post.push("Immer post");
      state.loading = false;
    }),
};

const displayName = "post";

const config = {
  initialState,
  actionsConfig,
  displayName,
  debug: true,
};

export default config;
