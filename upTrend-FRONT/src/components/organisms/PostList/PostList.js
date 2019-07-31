import React from 'react';
import { useStoreState } from 'easy-peasy';

import PostItem from '../PostItem/PostItem';

const PostList = ({ posts, showOnlyLiked }) => {
  const currentUserId = useStoreState(state => state.user.user.id);
  const selectedCategory = useStoreState(state => state.posts.selectedCategory);
  return showOnlyLiked
    ? posts
      .filter(post =>
        selectedCategory ? post.category === selectedCategory : post
      )
      .filter(post => post.likes.includes(currentUserId))
      .map(({ __typename, ...postProps }) => (
        <PostItem key={postProps.id} {...postProps} />
      ))
    : posts
      .filter(post =>
        selectedCategory ? post.category === selectedCategory : post
      )
      .map(({ __typename, ...postProps }) => (
        <PostItem key={postProps.id} {...postProps} />
      ));
};

export default PostList;
