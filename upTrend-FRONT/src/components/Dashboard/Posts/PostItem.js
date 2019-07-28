import React, { useState, useCallback } from 'react';
import { Mutation } from 'react-apollo';
import { useStoreState } from 'easy-peasy';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SeeIcon from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ConfirmPopover from '../../common/ConfirmPopover/ConfirmPopover';
import { DELETE_POST, GET_ALL_POSTS, UPDATE_POST } from '../../../graphql/posts';
import { usePostStyles } from './post.styles';
import { Grid, Typography, Button } from '@material-ui/core';
import PostFormDialog from './PostForm/PostFormDialog';

const PostItem = ({ id, userId, title, content, cover }) => {
  const currentUser = useStoreState(state => state.user.user.id);
  const classes = usePostStyles();
  const [isEditDialogOpen, setToggleEditDialog] = useState(false);
  const [post, setPost] = useState({
    postId: null,
    userId: null,
    title: '',
    content: '',
    cover: ''
  });

  const handleEditPost = (postId, userId, title, content, cover) => {
    setPost({ postId, userId, title, content, cover });
    handleToggleEditDialog();
  };

  const handleToggleEditDialog = useCallback(
    () => {
      setToggleEditDialog(prevState => !prevState);
    },
    []
  );

  return (
    <>
      {isEditDialogOpen && (
        <PostFormDialog
          mode='edit'
          initialValues={post}
          mutation={UPDATE_POST}
          isOpen={isEditDialogOpen}
          toggleDialog={handleToggleEditDialog}
        />
      )}
      <Grid item key={id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={cover}
            title={title}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='h4' component='h3'>
              {title}
            </Typography>
            <Typography gutterBottom variant='body1'>
              {content.length > 200 ? `${content.slice(0, 200)}...` : content}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button size='small' color='primary'>
              <SeeIcon color='primary' />
            </Button>
            {userId === currentUser && (
              <>
                <Button
                  size='small'
                  onClick={() =>
                    handleEditPost(id, userId, title, content, cover)
                  }
                >
                  <EditIcon color='secondary' />
                </Button>
                <Mutation mutation={DELETE_POST}>
                  {deletePost => (
                    <ConfirmPopover
                      confirmAction='Delete post'
                      onConfirmation={() =>
                        deletePost({
                          variables: {
                            postId: id
                          },
                          refetchQueries: [{ query: GET_ALL_POSTS }]
                        })
                      }
                    >
                      <DeleteIcon color='error' />
                    </ConfirmPopover>
                  )}
                </Mutation>
              </>
            )}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default PostItem;
