import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Metadata {
  name: string;
  url: string;
  fullName: string;
}

interface MetadataState {
  uploadedMetadata: Metadata[];
}

const initialState: MetadataState = {
  uploadedMetadata: [],
};

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setUploadedMetadata(state, action: PayloadAction<Metadata>) {
      state.uploadedMetadata.push(action.payload);
    },
    setAllMetadata(state, action: PayloadAction<Metadata[]>) {
      state.uploadedMetadata = action.payload;
    },
  },
});

export const { setUploadedMetadata, setAllMetadata } = metadataSlice.actions;
export default metadataSlice.reducer;
