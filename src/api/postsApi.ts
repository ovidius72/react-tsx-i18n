import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from 'features/posts/posts.sclice';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: builder => ({
    getAllPosts: builder.query<
      Post[],
      { limit?: number; skip?: number } | void
    >({
      query: () => `posts`,
    }),
    getOnePost: builder.query<Post, number>({
      query: id => `posts/${id}`,
    }),
  }),
});

export const {
  useGetOnePostQuery,
  useLazyGetAllPostsQuery,
  useGetAllPostsQuery,
  useLazyGetOnePostQuery,
} = postsApi;
