import { createSlice } from "@reduxjs/toolkit";

const baivietSlice = createSlice({
  name: "baiviet",
  initialState: {
    list: [],
  },
  reducers: {
    setBaivietList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setBaivietList } = baivietSlice.actions;
export default baivietSlice.reducer;
