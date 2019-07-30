import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { Button, Badge } from '@material-ui/core';
import LikeIcon from '@material-ui/icons/ThumbUp';

import { useLikeButtonStyles } from './likeButton.styles';
import { useStoreState } from 'easy-peasy';

const LikeButton = ({ likes, count }) => {
  const classes = useLikeButtonStyles();
  const isLiked = useStoreState(state => likes.includes(state.user.user.id));

  return (
    <Button
      size='small'
      color='primary'
      onClick={() => console.log('hey')}
    >
      <Badge classes={{ badge: classes.badge }} badgeContent={count} >
        <LikeIcon style={{
          color: isLiked ? 'green' : 'inherit'
        }} color='primary' />
      </Badge>
    </Button>
  );
};

export default LikeButton;
