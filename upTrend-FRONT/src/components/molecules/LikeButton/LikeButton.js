import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { Button, Badge } from '@material-ui/core';
import LikeIcon from '@material-ui/icons/ThumbUp';

import { GET_LIKES_COUNT_BY_POST } from 'graphql/likes';

import { useLikeButtonStyles } from './likeButton.styles';

const LikeButton = ({ postId }) => {
  const classes = useLikeButtonStyles();
  const { data, loading, error } = useQuery(GET_LIKES_COUNT_BY_POST, {
    variables: { postId }
  });
  if (loading) return <div />;
  if (error) return <h4>Oops, an error has occured.</h4>;
  return (
    <Button
      size='small'
      color='primary'
      onClick={() => console.log('hey')}
    >
      <Badge classes={{ badge: classes.badge }} badgeContent={data.likesCountByPostId.count} >
        <LikeIcon color='primary' />
      </Badge>
    </Button>
  );
};

export default LikeButton;
