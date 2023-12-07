import { createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "./requestMethod";

const initialState = {
  usersData: [],
  currentUser: null,
  isFetching: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveDataStart: (state) => {
      state.isFetching = true;
    },
    saveDataSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    saveDataFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateDataStart: (state) => {
      state.isFetching = true;
    },
    updateDataSuccess: (state, action) => {
      state.isFetching = false;
      state.usersData = state.usersData.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    updateDataFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getAllDataStart: (state) => {
      state.isFetching = true;
    },
    getAllDataSuccess: (state, action) => {
      state.isFetching = false;
      state.usersData = [...action.payload];
    },
    getAllDataFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

// Actions
export const {
  saveDataStart,
  saveDataSuccess,
  saveDataFailure,
  updateDataStart,
  updateDataSuccess,
  updateDataFailure,
  getAllDataStart,
  getAllDataSuccess,
  getAllDataFailure,
} = userSlice.actions;

// create data user
export const saveData = async (dispatch, user) => {
  dispatch(saveDataStart());
  try {
    const res = await axiosRequest.post("/api/userData/create", user);
    dispatch(saveDataSuccess(res?.data));
    console.log("redux data:", res.data);
    return res;
  } catch (error) {
    dispatch(saveDataFailure());
  }
};
// update data user
export const updateData = async (dispatch, user, id) => {
  dispatch(updateDataStart());
  try {
    const res = await axiosRequest.put(`/api/userData/edit/${id}`, user);
    dispatch(updateDataSuccess(res?.data));
    console.log("redux update data:", res.data);
    return res;
  } catch (error) {
    dispatch(updateDataFailure());
  }
};
// get All data user
export const getUsersData = async (dispatch) => {
  dispatch(getAllDataStart());
  try {
    const res = await axiosRequest.get("/api/userData");

    dispatch(getAllDataSuccess(res?.data));
    return res;
  } catch (error) {
    dispatch(getAllDataFailure());
  }
};

export default userSlice.reducer;
