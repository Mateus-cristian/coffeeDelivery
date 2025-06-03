import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";

const store = configureStore({
  reducer: cartSlice,
});

export type IAsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state: IRootState;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: any;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: any;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: any;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: any;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: any;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: any;
};
export type IRootState = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;

export default store;
