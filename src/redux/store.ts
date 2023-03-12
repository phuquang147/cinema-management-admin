import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [saga],
});

saga.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
