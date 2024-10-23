import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import metadataReducer from './slices/sliceMetaData';

export const store = configureStore({
  reducer: {
    metadata: metadataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
