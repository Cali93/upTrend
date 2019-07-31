import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { GET_ALL_COMMENTS_BY_POST } from 'graphql/comments';
import CommentsList from 'components/organisms/CommentsList/CommentsList';
import LikeButton from 'components/molecules/LikeButton/LikeButton';

import { usePostDetailsStyles } from './postDetails.styles';

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function PostDetails ({ isOpen, toggleDialog, title, cover, category,
  content, author, postId, likes, commentsCount }) {
  const classes = usePostDetailsStyles();
  const { data, loading, error } = useQuery(GET_ALL_COMMENTS_BY_POST, {
    variables: { postId }
  });
  if (loading) return <div />;
  if (error) return <h4>Oops, an error has occured</h4>;

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={toggleDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={toggleDialog}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              {category}
            </Typography>
          </Toolbar>
        </AppBar>
        <img src={cover} className={classes.coverImage} alt={title} />
        <List className={classes.list}>
          <ListItem alignItems='center'>
            <ListItemText primary={title} secondary={author} />
            <ListItemText
              className={classes.postActions}
              classes={{ primary: classes.likeButtonWrapper }}
              primary={
                <LikeButton
                  likes={likes}
                  count={likes.length}
                  postId={postId}
                />
              }
              secondary={
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={toggleDialog}
                  className={classes.addCommentBtn}
                >
                  Add comment
                </Button>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={content} />
          </ListItem>
        </List>
        <Divider />
        <CommentsList comments={data.allCommentsByPostId.comments} />
      </Dialog>
    </div>
  );
}
