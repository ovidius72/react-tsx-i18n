const BASE_API_URL = 'https://jsonplaceholder.typicode.com';

const endpoints = {
  posts: 'posts',
  users: 'users',
};

const buildPath = (key: keyof typeof endpoints) => {
  return `${BASE_API_URL}/${key}`;
};

export const apiService = {
  posts: {
    getAll: () => fetch(buildPath('posts')),
    getOne: (id: number) => fetch(`${buildPath('posts')}/${id}`),
  },
  users: {
    getAll: () => fetch(buildPath('users')),
  },
};
