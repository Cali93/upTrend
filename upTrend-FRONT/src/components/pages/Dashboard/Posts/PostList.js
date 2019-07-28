import React from 'react';
import PostItem from '../../../organisms/PostItem/PostItem';

const PostList = ({ posts }) => {
  return posts.map(({ __typename, ...postProps }) => (
    <PostItem key={postProps.id} {...postProps} />
  ));
};

export default PostList;
