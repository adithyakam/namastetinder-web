import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null, // Initialize as an empty array for consistent structure
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // Overwrite the feed with new data
    },
    removeUserFromFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload); // Remove user by ID
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
