import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Photo = {
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
  albumId: number;
};

export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: builder => ({
    getAllPhotos: builder.query<Photo[], number | void>({
      query: (limit = 10) => `photos?${limit}`,
    }),
    getOnePhoto: builder.query<Photo, number>({
      query: id => `photos/${id}`,
    }),
  }),
});

export const {
  useGetAllPhotosQuery,
  useLazyGetOnePhotoQuery,
  useGetOnePhotoQuery,
  useLazyGetAllPhotosQuery,
} = photosApi;
