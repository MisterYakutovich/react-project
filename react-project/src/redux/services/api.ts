import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const pokemonApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({}),
});
