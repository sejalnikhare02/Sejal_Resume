import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
    setPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
  },
});

export default rootSlice.reducer;

export const { showLoading, HideLoading, setPortfolioData } = rootSlice.actions;

// ✅ ASYNC ACTION
export const getPortfolioData = () => async (dispatch) => {
  try {
    dispatch(showLoading());

    const res = await axios.get("/api/portfolio/get-portfolio-data");

    dispatch(HideLoading());

    if (res.data.success) {
      dispatch(setPortfolioData(res.data.data));
    }
  } catch (error) {
    dispatch(HideLoading());
    console.log(error);
  }
};
