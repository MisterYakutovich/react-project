import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

export const pokemonApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getFile:builder.query({
        query:(filePath)=>{
            const fileRef=ref(storage, filePath);
            return getDownloadURL(fileRef)
            .then((url) => ({ url })); 
        }
    })
  }),
});
