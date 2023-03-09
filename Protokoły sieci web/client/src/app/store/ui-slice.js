import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: { modalIsVisible: false, modalTitle: "", modalMsg: "" },
  reducers: {
    showModal(state, action) {
      const {title, msg} = action.payload
      state.modalIsVisible = true;
      state.modalTitle = title;
      state.modalMsg = msg
    },
    hideModal(state) {
      state.modalIsVisible = false;
      state.modalTitle = "";
      state.modalMsg = ""
    }
  }
})

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
