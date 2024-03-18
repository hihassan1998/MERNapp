import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // just like using axios in other projects

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})