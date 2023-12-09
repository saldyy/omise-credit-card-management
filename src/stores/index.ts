import { configureStore } from "@reduxjs/toolkit";
import { creditCardsApi } from "./apis/CreditCards";

export const store = configureStore({
  reducer: {
    [creditCardsApi.reducerPath]: creditCardsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(creditCardsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
