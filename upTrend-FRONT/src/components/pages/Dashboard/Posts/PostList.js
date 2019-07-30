import React from 'react';
import PostItem from '../../../organisms/PostItem/PostItem';
import { useStoreState } from 'easy-peasy';

const PostList = ({ posts }) => {
  const selectedCategory = useStoreState(state => state.posts.selectedCategory);
  return posts
    .filter(post =>
      selectedCategory ? post.category === selectedCategory : post
    )
    .map(({ __typename, ...postProps }) => (
      <PostItem key={postProps.id} {...postProps} />
    ));
};

export default PostList;
