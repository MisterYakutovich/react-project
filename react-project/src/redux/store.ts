import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import metadataReducer from './slices/sliceMetaData';
import { fileApi } from './services/api';

export const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
    metadata: metadataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fileApi.middleware),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
