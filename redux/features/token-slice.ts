import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Tokens {
  access: {
    token: string;
    expires: string;
  };
}
interface InitialState {
  value: Tokens | null;
}

const initialState: InitialState = {
  value: {
    access: {
      token: "",
      expires: "",
    },
  },
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Tokens | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
