import { action } from 'easy-peasy';

export const posts = {
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload;
    return state;
  })
};
