import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initial_state,
  reducers: {
    addUser: (state, action) => {
      return { ...action.payload };
    },
  },
});

export default userSlice.Reducer;
export const { addUser } = userSlice.actions;
