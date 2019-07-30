import { action } from 'easy-peasy';

export const posts = {
  posts: [],
  selectedCategory: '',
  setCategoryToBrowse: action((state, category) => {
    state.selectedCategory = category;
    return state;
  }),
  setPosts: action((state, payload) => {
    state.posts = payload;
    return state;
  })
};
