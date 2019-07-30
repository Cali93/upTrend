import React from 'react';
import { Badge, Button } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import { GET_COMMENTS_COUNT_BY_POST } from 'graphql/comments';
import { useQuery } from 'react-apollo-hooks';
import { useCommentButtonStyles } from './commentButton.styles';

const CommentsIndicator = ({ onClick, postId }) => {
  const classes = useCommentButtonStyles();
  const { data, loading, error } = useQuery(GET_COMMENTS_COUNT_BY_POST, {
    variables: { postId }
  });

  if (loading) return <div />;
  if (error) return <h4>Oops, an error has occured.</h4>;
  return (
    <Button size='small' color='primary' onClick={onClick}>
      <Badge
        classes={{ badge: classes.badge }}
        badgeContent={data.commentsCountByPostId.count}
        color='secondary'
      >
        <CommentIcon color='primary' />
      </Badge>
    </Button>
  );
};

export default CommentsIndicator;
