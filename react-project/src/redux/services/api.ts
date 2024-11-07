import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  getMetadata,
  listAll,
} from 'firebase/storage';
import { storage } from '../../firebase/firebase';

export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchFile: builder.query({
      async queryFn() {
        try {
          const storageRef = ref(storage, 'uploads/');
          const files = await listAll(storageRef);
          const metadataPromises = files.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            const metadata = await getMetadata(itemRef);

            return {
              id: itemRef.fullPath,
              name: metadata.customMetadata?.name || '',
              fullName: itemRef.name,
              url: url,
            };
          });

          const allMetadata = await Promise.all(metadataPromises);
          return { data: allMetadata };
        } catch (err) {
          console.log('Fetched files:', err);
          return { error: err };
        }
      },
    }),
    addFile: builder.mutation({
      async queryFn({ file, fullName, name }) {
        const storageRef = ref(storage, `uploads/${file.name}`);
        try {
          await uploadBytes(storageRef, file, {
            customMetadata: {
              name: name,
            },
          });

          const url = await getDownloadURL(storageRef);

          return { data: { url: url, name: name, fullName: fullName } };
        } catch (err) {
          return { error: err };
        }
      },
    }),
  }),
});

export const { useFetchFileQuery, useAddFileMutation } = fileApi;
