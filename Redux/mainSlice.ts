import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// declaring the types for our state
export type MainState = {
  muted: boolean;
};

const initialState: MainState = {
  muted: true,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions.
  // In this example, 'increment', 'decrement' and 'incrementByAmount' are actions. They can be triggered from outside this slice, anywhere in the app.
  // So for example, if we make a dispatch to the 'increment' action here from the index page, it will get triggered and change the value of the state from 0 to 1.
  reducers: {
    toggleMute: (state: any) => {
      state.muted = !state.muted;
    },
    //decrement: (state: any) => {
    //  state.value--;
    //},
    // 'The increment by amount' action here, has one job and that is to take whatever value is passed to it and add that to state.value.
    // The PayloadAction type here is used to declare the contents of `action.payload`
    //incrementByAmount: (state: any, action: PayloadAction<number>) => {
    //  state.value += action.payload;
    //},
  },
});
// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { toggleMute } = mainSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectMute = (state: RootState) => state.main.muted;

// exporting the reducer here, as we need to add this to the store
export default mainSlice.reducer;
